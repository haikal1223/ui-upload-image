import React, { Component } from 'react'
import {CustomInput} from 'reactstrap'
import axios from 'axios'
import { API_URL } from '../helpers';

class ManagePosts extends Component{
    state= {
        listPost : [],
        addImageFileName : 'Select Image...',
        addImageFile : undefined,
        captionAdd : '',
        selectedEditPostId : 0,
        editImageFileName : 'Select Image...',
        editImageFile : undefined,
        captionEdit : ''
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

    onEditImageFileChange = (event) =>{
        if(event.target.files[0]){
            this.setState({editImageFileName : event.target.files[0].name, editImageFile : event.target.files[0]})
        }
        else{
            this.setState({editImageFileName : 'Select Image...', editImageFile: undefined})
        }
    }

    onCaptionAddChange = (event) =>{
        console.log(event.target.value);
        if (event.target.value.length <= 100 ){
            this.setState({captionAdd: event.target.value})
        }
    }

    onCaptionEditChange = (event) =>{
        console.log(event.target.value);
        if (event.target.value.length <= 100 ){
            this.setState({captionEdit: event.target.value})
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

   
    
    
    onBtnUpdatePostClick = (id) =>{
        var formData = new FormData()
        var headers = {
            headers:
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            caption : this.state.captionEdit,
        }

        formData.append('image',this.state.editImageFile)
        formData.append('data',JSON.stringify(data))

        axios.put(API_URL + "/post/editpost/" + id, formData,headers)
        .then((res)=>{
            this.setState({listPost : res.data,selectedEditPostId : 0, editImageFile : 'Select Image...'})
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    // onCancelBtnClick(){
    //     onBtnUpdatePostClick = (id) =>{
    //         var formData = new FormData()
    //         var headers = {
    //             headers:
    //             {'Content-Type': 'multipart/form-data'}
    //         }
    
    //         var data = {
    //             caption : this.state.captionEdit,
    //         }
    
    //         formData.append('image',this.state.editImageFile)
    //         formData.append('data',JSON.stringify(data))
    
    //         axios.put(API_URL + "/post/editpost/" + id, formData,headers)
    //         .then((res)=>{
    //             this.setState({listPost : res.data,selectedEditPostId : 0, editImageFile : 'Select Image...'})
    //         })
    //         .catch((err)=>{
    //             console.log(err);
                
    //         })
    //     };
    //     forSet = () =>{
    //         this.setState({editImageFileName :'Select Image...'})
    //     }
    // }

    

    renderListPost = () =>{
        return this.state.listPost.map((item)=>{
            if(item.id !== this.state.selectedEditPostId){

                return (<tr>
                    <td>{item.id}</td>
                    <td><img src={API_URL + item.image} alt={item.image} width={100}/></td>
                    <td>{item.caption}</td>
                    <td>{item.userId}</td>
                    <td><input type='button' className='btn btn-primary' value='EDIT' onClick={()=> this.setState({selectedEditPostId : item.id,captionEdit:item.caption})} /> </td>
                    <td><input type='button' className='btn btn-danger' value='DELETE' onClick={()=> this.onBtnDeletePostClick(item.id)}/></td>
                </tr>)
            }
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>
                            <img src={`${API_URL}${item.image}`} alt={`${item.image}`} width={100}/>
                           
                           
                          <CustomInput id='editImagePost' type='file' label={this.state.editImageFileName} onChange={this.onEditImageFileChange}  />  
                        </td>
                        <td>
                            <textarea value={this.state.captionEdit} onChange={this.onCaptionEditChange}>
                            </textarea>
                        </td>
                        <td>{item.userId}</td>
                        <td><input type='button' className='btn btn-primary' value='CANCEL' onClick={()=> this.setState({selectedEditPostId : 0})} /></td>
                        <td><input type='button' className='btn btn-primary' value='SAVE' onClick={()=> this.onBtnUpdatePostClick(item.id)}  /></td>
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