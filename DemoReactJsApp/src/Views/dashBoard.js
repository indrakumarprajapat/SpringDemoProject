import React from 'react';
import ServiceProvider from '../Controller/servicesProvider';
import '../Css/dashBoard.css'
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import "../Css/dashBoard.css";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Modal,
    Button
} from 'reactstrap';
import Header from '../Component/header';


class DashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerQuestDetailState: [],
            question: null,
            answer: null,
            id: null,
            updatedQuestion: null,
            updatedAnswer: null,
            defaultModal: false,
            submit: "Submit"
        }
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount(){
        const getSessionDetails = sessionStorage.getItem('customerQuestDetailState');

        const questDetails = JSON.parse(getSessionDetails);

        this.setState({ customerQuestDetailState: questDetails});
    }

    async endPointServicesCall(method, methodName, data, modal) {

        try {

            const serviceInfo = new ServiceProvider();

            const responseResult = await serviceInfo.serviceCall(method, methodName, data);

            if (responseResult.status == 200) {

                const responseData = JSON.stringify(responseResult.data);

                this.setState({ customerQuestDetailState: responseResult.data });

                sessionStorage.setItem('customerQuestDetailState', responseData);

                this.toggleModal(modal);

                this.setState({ submit: "Submit" });

                console.log(this.state.customerQuestDetailState);

            } else {

                this.setState({ showError: true });

            }
        } catch (e) {

            console.log(e);
        }

    }
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        })
    }
    editQuestion(e, row) {
        e.preventDefault();
        this.toggleModal("questionModal")
        this.setState({
            question: row.question,
            answer: row.answer,
            id: row.userId
        })
    }
    handleChangeQuestion(e) {
        const questionUpdated = e.target.value;

        this.setState({ updatedQuestion: questionUpdated });
    }
    submitQuestion(e) {
        this.setState({ submit: "loading..." })
        const details = {
            "question": this.state.updatedQuestion,
            "answer": this.state.answer
        }
        this.endPointServicesCall("put", `capi/update/${this.state.id}`, details, "questionModal")
    }
    editAnswer(e, row) {
        e.preventDefault();
        this.toggleModal("answerModel")
        this.setState({
            question: row.question,
            answer: row.answer,
            id: row.userId
        })
    }
    handleChangeAnswer(e) {
        const answerUpdated = e.target.value;

        this.setState({ updatedAnswer: answerUpdated });
    }
    submitAnswer(e) {
        this.setState({ submit: "loading..." })
        const details = {
            "question": this.state.question,
            "answer": this.state.updatedAnswer
        }
        this.endPointServicesCall("put", `capi/update/${this.state.id}`, details, "answerModel")
    }
    deleteQuest(e, row) {
        e.preventDefault();
        this.toggleModal("deleteModel")
        this.setState({
            question: row.question,
            answer: row.answer,
            id: row.userId
        })
    }
    submitDelete(e) {
        this.setState({ submit: "loading..." })
        const details = {
            "question": this.state.question,
            "answer": this.state.answerUpdated
        }
        this.endPointServicesCall("delete", `capi/delete/${this.state.id}`, details, "deleteModel")
    }
    handleSubmit(e) {
        this.setState({ submit: "loading..." })
        e.preventDefault();
        const data = new FormData(e.target);

        const details = {
            "question": data.get('question'),
            "answer": data.get('answer'),
        };

        this.endPointServicesCall("post", "capi", details, "insertModal")
    }

    editTable = (cell, row) => {
        return (
            <UncontrolledDropdown group>
                <DropdownToggle caret color="primary">
                    Update
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#pablo" onClick={e => this.editQuestion(e, row)} >
                        Question
                    </DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => this.editAnswer(e, row)}>
                        Answer
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#pablo" onClick={e => this.deleteQuest(e, row)}>
                        <span className="delete-txt">
                            Delete Quest
                        </span>

                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }



    render() {
        return (
            <>
                <div>
                    <Header />
                    <div className="container containerDashBoard">
                        <div className="row cus-det">
                            <div className="col ">
                                <h3>
                                    Quest Details
                                </h3>
                            </div>
                            <div className="col add-customer">
                                <button type="button" class="btn btn-primary btn-sm add-customer" onClick={() => this.toggleModal("insertModal")}>Add Quest +</button>
                            </div>

                        </div>
                        <ToolkitProvider
                            data={this.state.customerQuestDetailState}
                            keyField="userId"
                            columns={[
                                {
                                    dataField: "userId",
                                    text: "userId",
                                    sort: true
                                },
                                {
                                    dataField: "question",
                                    text: "Question",
                                    sort: true
                                },
                                {
                                    dataField: "answer",
                                    text: "Answer",
                                    sort: true
                                },
                                {
                                    dataField: "Edit",
                                    text: "Action",
                                    formatter: this.editTable,
                                    sort: true,
                                    editable: true
                                }
                            ]}

                        >
                            {props => (
                                <div className="py-4">
                                    <BootstrapTable
                                        {...props.baseProps}
                                        bootstrap4={true}
                                        bordered={false}
                                    />
                                </div>
                            )}
                        </ToolkitProvider>
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.questionModal}
                            toggle={() => this.toggleModal("questionModal")}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Update Question
                                </h5>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("questionModal")}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" placeholder={this.state.question} name="name" onChange={this.handleChangeQuestion} />
                            </div>
                            <div className="modal-footer">
                                <Button color="primary" type="button" onClick={e => this.submitQuestion(e)}>
                                    {this.state.submit}
                                </Button>
                            </div>
                        </Modal>
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.answerModel}
                            toggle={() => this.toggleModal("answerModel")}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Update Answer
                                </h5>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("answerModel")}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="text" className="form-control" placeholder={this.state.email} name="name" onChange={this.handleChangeAnswer} />
                            </div>
                            <div className="modal-footer">
                                <Button color="primary" type="button" onClick={e => this.submitAnswer(e)}>
                                    {this.state.submit}
                                </Button>
                            </div>
                        </Modal>
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.deleteModel}
                            toggle={() => this.toggleModal("deleteModel")}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Delete Customer ?
                                </h5>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("deleteModel")}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete {this.state.name}
                            </div>
                            <div className="modal-footer">
                                <Button color="danger" type="button" onClick={e => this.submitDelete(e)}>
                                    {this.state.submit}
                                </Button>
                            </div>
                        </Modal>
                        <Modal
                            className="modal-dialog-centered"
                            isOpen={this.state.insertModal}
                            toggle={() => this.toggleModal("insertModal")}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Create Quest
                                </h5>
                                <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("QuestionModal")}
                                >
                                    <span aria-hidden={true}>×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={e => this.handleSubmit(e)}>
                                    <label>
                                        Question:
                                    </label>
                                    <input type="textarea" className="form-control" placeholder="Question" name="question" />
                                    <br />
                                    <label>
                                        Answer:
                                    </label>
                                    <input type="textarea" className="form-control" placeholder="Answer" name="answer" />
                                    <br />
                                    <div className="modal-footer">
                                        <Button color="primary">
                                            {this.state.submit}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                        </Modal>
                    </div>
                </div>
            </>
        )
    }
}

export default DashBoard;