import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table, Alert, Card } from 'react-bootstrap';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
    const [beginDate, setBeginDate] = useState([]);
    const [endDate, setEndDate] = useState([]);
    const [summaryData, setSummaryData] = useState([]);

    const getSummaryData = async (strBeginDate, strEndDate) => {
        const json = await (
            /// https://www.betstation1.com/open/admin/dashboard_v
            await fetch(`https://www.betstation1.com/open/admin/dashboard`, {method: 'POST', 
            credentials: 'include', 
            body: `agent_id=BETSTATION1&open_id=HUB88&begin_dt=${strBeginDate}&end_dt=${strEndDate}`,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }})
        ).json();
        console.log(json);
        setSummaryData(json);
    };

    const onChangeBeginDate = (event) => {
        setBeginDate(event.target.value);
    }

    const onChangeEndDate = (event) => {
        setEndDate(event.target.value);
    }

    const onClickGetSummaryData = (event) => {
        event.preventDefault();
        getSummaryData(beginDate, endDate);
    }

    useEffect(() => {
        const browserGmt = moment().utcOffset() / 60;
        const todayBeginDate = moment(moment().format('YYYY-MM-DD 00:00:00')).add(-browserGmt, 'hour').format('YYYY-MM-DD HH:00:00');
        const todayEndDate = moment(moment().format('YYYY-MM-DD 23:59:59')).add(-browserGmt, 'hour').format('YYYY-MM-DD HH:59:59');

        setBeginDate(todayBeginDate);
        setEndDate(todayEndDate);
        getSummaryData(todayBeginDate, todayEndDate);
    }, []);

    console.log('render');

    return (
        <div>
            <Container>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBeginDate">
                                <Form.Label>Begin Date</Form.Label>
                                <Form.Control value={beginDate} type="datetime" placeholder="Begin Date" onChange={onChangeBeginDate} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEndDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control value={endDate} type="text" placeholder="End Date" onChange={onChangeEndDate} />
                            </Form.Group>
                            
                            <Button variant="primary" onClick={onClickGetSummaryData}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                
            </Container>
            {summaryData.length === 0 ? (
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Col>Loading...</Col>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            ) : (
                <div>
                    {!summaryData.result ? (
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Alert variant='danger'>
                                                    {summaryData.result_msg}
                                                </Alert>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    ) : (
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <h1>Summary</h1>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>key</th>
                                                        <th>value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {Object.entries(summaryData.result_data.summary).map(([key, value], idx) => (
                                                    <tr key={idx}>
                                                        <td>{key}</td>
                                                        <td>{value}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    )}
                </div>
            )}
        </div>
    );
}
export default Layout;