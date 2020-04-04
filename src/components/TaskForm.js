import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name: '',
            status: false
        }
    }
    
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        //console.log('task',name)//status;
        let value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });   
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        // huy va dong form
        this.onClear();
        this.onCloseForm();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
    }

    
    UNSAFE_componentWillMount() {
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
            //console.log(this.state);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
            //console.log(this.state);
        }else if(nextProps && nextProps.task === null){
            // console.log('sua -> them');
            this.setState({
                id:'',
                name: '',
                status: false
            });
            
        }
    }
    
    
  render() { 
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">{this.state.id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                    <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}></span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" required="required" name="status" value={this.state.status} onChange={this.onChange}>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div> 
    );
  }
}

export default TaskForm;

