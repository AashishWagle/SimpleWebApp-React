import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader, Table, Button, FormGroup, Label, Input, Form } from 'reactstrap';

class App extends Component {

  state = {
    employees: [],

    newEmployeeData: {
      name: '',
      salary: '',
      age:''
    },

    editEmployeeData:{
      name:'',
      salary:'',
      age:''
    },

    newEmployeeModal : false,
    editEmployeeModal : false
  }

  componentDidMount(){
    this._refreshBooks();
  }

  toggleNewEmployee(){
    this.setState({
      newEmployeeModal : !this.state.newEmployeeModal
    });
  }

  toggleEditEmployee(){
    this.setState({
      editEmployeeModal : !this.state.editEmployeeModal
    });
  }

  addEmployee(){
    axios.post('http://dummy.restapiexample.com/api/v1/create', this.state.newEmployeeData).then((Response) => {
      // console.log(Response.data)
      let {employees} = this.state;

      employees.push(Response.data);

      this._refreshBooks();

      this.setState({employees, newEmployeeModal:false, newEmployeeData: {
        name: '',
        salary: '',
        age:''
      }});
    });
  }

  editEmployee(id,name,salary,age){
    this.setState({
      editEmployeeData: {id,name,salary,age}, editEmployeeModal: !this.state.editEmployeeModal
    });
  }

  updateEmployee(){

    let { name,salary,age } = this.state.editEmployeeData;

    axios.put('http://dummy.restapiexample.com/api/v1/update/' + this.state.editEmployeeData.id,{
      name,salary,age
    }).then((Response) => {
      //console.log(Response.data);
      this._refreshBooks();

      this.setState({
        editEmployeeModal:false, editEmployeeData:{
          name:'',
          salary:'',
          age:''
        }
      })

    });
  }

  _refreshBooks(){
    axios.get('http://dummy.restapiexample.com/api/v1/employees').then((Response) => {
    this.setState({
      employees: Response.data
    })
    });
  }

  deleteEmployee(id){
    //console.log(id);
    axios.delete('http://dummy.restapiexample.com/api/v1/delete/'+id).then((Response) => {
    this._refreshBooks();
    });
  }

  render(){

    let employs = this.state.employees.map((employee) => {
      return (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.employee_name}</td>
          <td>{employee.employee_salary}</td>
          <td>{employee.employee_age}</td>
          <td>
            <Button color="success" size="small" className="mr-2" onClick={ this.editEmployee
            .bind(this,employee.id,employee.employee_name,employee.employee_salary,employee.employee_age) }>Edit</Button>
            <Button color="danger" size="small" onClick={this.deleteEmployee.bind(this,employee.id)}>Delete</Button>
          </td>
        </tr>
      )
    });

    return (
      <div className="App container">

        <h1>Employee Details</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewEmployee.bind(this)}>Add Employee</Button>
      
      {/* Adding Employee Modal */}

        <Modal isOpen={this.state.newEmployeeModal} toggle={this.toggleNewEmployee.bind(this)}> 
        <ModalHeader toggle={this.toggleNewEmployee.bind(this)}>Add New Employee</ModalHeader>

          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="Employee Name">Name</Label>
                <Input type="text" id="txtName" value={this.state.newEmployeeData.name} onChange={(e) => {
                  let { newEmployeeData } = this.state;
                  newEmployeeData.name = e.target.value;
                  this.setState({newEmployeeData});
                  
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="Employee Salary">Salary</Label>
                <Input id="txtSalary" value={this.state.newEmployeeData.salary} onChange={(e) => {
                    let { newEmployeeData } = this.state;
                    newEmployeeData.salary = e.target.value;
                    this.setState({newEmployeeData});
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="Employee Age">Age</Label>
                <Input id="txtAge" value={ this.state.newEmployeeData.age } onChange={(e) => {
                  let { newEmployeeData } = this.state;
                  newEmployeeData.age = e.target.value;
                  this.setState({ newEmployeeData });
                }}/>
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.addEmployee.bind(this)}>Add Employee</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewEmployee.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
        {/* Updating Employee Modal */}

        <Modal isOpen={this.state.editEmployeeModal} toggle={this.toggleEditEmployee.bind(this)}> 
        <ModalHeader toggle={this.toggleEditEmployee.bind(this)}>Add New Employee</ModalHeader>

          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="Employee Name">Name</Label>
                <Input type="text" id="txtName" value={this.state.editEmployeeData.name} onChange={(e) => {
                  let { editEmployeeData } = this.state;
                  editEmployeeData.name = e.target.value;
                  this.setState({editEmployeeData});
                  
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="Employee Salary">Salary</Label>
                <Input id="txtSalary" value={this.state.editEmployeeData.salary} onChange={(e) => {
                    let { editEmployeeData } = this.state;
                    editEmployeeData.salary = e.target.value;
                    this.setState({editEmployeeData});
                }}/>
              </FormGroup>
              <FormGroup>
                <Label for="Employee Age">Age</Label>
                <Input id="txtAge" value={ this.state.editEmployeeData.age } onChange={(e) => {
                  let { editEmployeeData } = this.state;
                  editEmployeeData.age = e.target.value;
                  this.setState({ editEmployeeData });
                }}/>
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.updateEmployee.bind(this)}>Update Employee</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditEmployee.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Employee Salary</th>
              <th>Employee Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {employs}
          </tbody>
        </Table>
        
      </div>
    );
  }
  
}

export default App;
