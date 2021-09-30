import axios from 'axios';

export default class ServiceProvider {

    async serviceCall(method, methodName, dataInfo) {

        const servicesCallController = await axios[`${method}`](`http://localhost:3000/${methodName}`, dataInfo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {

                return (response);

        })
        .catch((error) => {

                return (error)

        })
        return servicesCallController
    }
}