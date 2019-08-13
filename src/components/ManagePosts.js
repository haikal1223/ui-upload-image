import React, { Component } from 'react'
import {CustomInput} from 'reactstrap'
import axios from 'axios'
import { API_URL } from '../helpers';

class ManagePosts extends Component{
    state= {
        listPost : [],
        addImageFileName : 'Select Image...',
        addImageFile : undefined,
        captionAdd : ''
    }

    componentDidMount(){
        axios.get(`${API_URL}/post/getposts`)
        .then((res)=>{
            this.setState({listPost : res.data})
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    onAddImageFileChange = (event) =>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0]);
        var file = event.target.files[0]
      
        if (file) {
            this.setState({addImageFileName :file.name, addImageFile: file })
        }else{
            this.setState({addImageFileName : 'Select Image...', addImageFile: undefined})
        }
    }
    onCaptionAddChange = (event) =>{
        console.log(event.target.value);
        if (event.target.value.length <= 100 ){
            this.setState({captionAdd: event.target.value})
        }
    }
    onBtnAddPostClick = () =>{
        if(this.state.addImageFile){
            var formData = new FormData()
            var headers = {
                headers : 
                {'Content-Type': 'multipart/form-data'}
            }
            var data = {
                caption : this.state.captionAdd,
                userId : 1
            }

            // append mirip push di array
            formData.append('image', this.state.addImageFile)
            formData.append('data', JSON.stringify(data))

            axios.post(API_URL + '/post/addpost',formData,headers)
            .then((res)=>{
                console.log(res.data);
                axios.get(`${API_URL}/post/getposts`)
                 .then((res)=>{
                this.setState({listPost : res.data})
                })
                 .catch((err)=>{
                console.log(err);
            
                 })
                 this.setState({addImageFileName: 'Select Image...', captionAdd : ''})
                
                
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
        
    }

    onBtnDeletePostClick = (id) =>{
        axios.delete(`${API_URL}/post/deletepost/${id}`)
        .then((res)=>{
            this.setState({listPost : res.data})
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    onBtnEditPostClick = (id) =>{
        
    }

    renderListPost = () =>{
        return this.state.listPost.map((item)=>{
        return( <tr key={item.id}>
            <td>{item.id}</td>
            <td><img src={API_URL + item.image} alt={item.image} width={100}/></td>
            <td>{item.caption}</td>
            <td>{item.userId}</td>
            <td><input type='button' className='btn btn-primary' value='EDIT' onClick={()=> this.onBtnEditPostClick(item.id)} /> </td>
            <td><input type='button' className='btn btn-danger' value='DELETE' onClick={()=> this.onBtnDeletePostClick(item.id)}/></td>
        </tr>
        )
        })
    }

    render(){
        return(
            <div>
                <center>
                    <h1> Manage Posts</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Caption</th>
                                <th>User Id</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListPost()}
                        </tbody>
                        <tfoot>
                           <tr>
                               <td></td>
                               <td>
                                <CustomInput id="addImagePost" type='file' label={this.state.addImageFileName} onChange={this.onAddImageFileChange} /> 
                               </td>
                                <td>
                                    <textarea value={this.state.captionAdd} onChange={this.onCaptionAddChange}>
                                    </textarea>
                                </td>
                               <td></td>
                               <td>
                               <input type='button' className='btn btn-success' value='add ' onClick={this.onBtnAddPostClick}/>
                               </td>
                               <td></td>
                           </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        )
    }
}

export default ManagePosts