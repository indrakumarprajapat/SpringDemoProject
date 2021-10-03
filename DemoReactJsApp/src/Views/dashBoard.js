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

//services provider
const serviceInfo = new ServiceProvider();

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

    //init method to fetch all the records from table
    async componentDidMount() {

         //get all records
         const getAllRecords = await serviceInfo.serviceCall("get", `questions`, null);

         if (getAllRecords.status === 200 || getAllRecords.status === 201 || getAllRecords.status === 202) {

             const responseData = JSON.stringify(getAllRecords.data);

             this.setState({ customerQuestDetailState: getAllRecords.data });

             sessionStorage.setItem('customerQuestDetailState', responseData);

             console.log(this.state.customerQuestDetailState);

         }
    }

    //perform api call's
    async endPointServicesCall(method, methodName, data, modal) {

        try {

            const responseResult = await serviceInfo.serviceCall(method, methodName, data);

            if (responseResult.status === 200 || responseResult.status === 201 || responseResult.status === 202) {

                //get all records
                const getAllRecords = await serviceInfo.serviceCall("get", `questions`, null);

                if (getAllRecords.status === 200 || getAllRecords.status === 201 || getAllRecords.status === 202) {

                    const responseData = JSON.stringify(getAllRecords.data);

                    this.setState({ customerQuestDetailState: getAllRecords.data });

                    sessionStorage.setItem('customerQuestDetailState', responseData);

                    this.toggleModal(modal);

                    this.setState({ submit: "Submit" });

                    console.log(this.state.customerQuestDetailState);

                } else {
                    this.setState({ showError: true });
                }

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
            id: row.id
        })
    }
    handleChangeQuestion(e) {
        const questionUpdated = e.target.value;

        this.setState({ updatedQuestion: questionUpdated });
    }
    submitQuestion(e) {
        this.setState({ submit: "loading..." })
        console.log(this.state.updatedQuestion);
        console.log(this.state.answer);
        const details = {
            "id": this.state.id,
            "text": this.state.updatedQuestion,
            "answer": this.state.answer
        }
        this.endPointServicesCall("put", `questions/${this.state.id}`, details, "questionModal")
    }
    editAnswer(e, row) {
        e.preventDefault();
        this.toggleModal("answerModel")
        this.setState({
            question: row.text,
            answer: row.answer,
            id: row.id
        })
    }
    handleChangeAnswer(e) {
        const answerUpdated = e.target.value;

        this.setState({ updatedAnswer: answerUpdated });
    }
    submitAnswer(e) {
        this.setState({ submit: "loading..." });
        console.log(this.state.question);
        console.log(this.state.updatedAnswer);

        const details = {
            "id": this.state.id,
            "text": this.state.question,
            "answer": this.state.updatedAnswer
        }
        this.endPointServicesCall("put", `questions/${this.state.id}`, details, "answerModel")
    }
    deleteQuest(e, row) {
        e.preventDefault();
        this.toggleModal("deleteModel")
        this.setState({
            question: row.question,
            answer: row.answer,
            id: row.id
        })
    }
    submitDelete(e) {
        this.setState({ submit: "loading..." })
        const details = {
            "id": this.state.id,
            "text": this.state.question,
            "answer": this.state.answerUpdated
        }
        this.endPointServicesCall("delete", `questions/${this.state.id}`, details, "deleteModel")
    }
    handleSubmit(e) {
        this.setState({ submit: "loading..." })
        e.preventDefault();
        const data = new FormData(e.target);

        const details = {
            "text": data.get('question'),
            "answer": data.get('answer'),
        };

        this.endPointServicesCall("post", "questions", details, "insertModal")
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
                                <button type="button" className="btn btn-primary btn-sm add-customer" onClick={() => this.toggleModal("insertModal")}>Add Quest +</button>
                            </div>

                        </div>
                        <ToolkitProvider
                            data={this.state.customerQuestDetailState}
                            keyField="id"
                            columns={[
                                {
                                    dataField: "id",
                                    text: "id",
                                    sort: true
                                },
                                {
                                    dataField: "text",
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
                                <input type="text" className="form-control" placeholder={this.state.answer} name="name" onChange={this.handleChangeAnswer} />
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
                                Are you sure to delete 
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