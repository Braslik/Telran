import React, {useEffect, useState} from 'react';
import {nameMinLength} from "../config/ShopConfig";
import {getInputElement, getInputElementBlur} from "../utils/inputElements";
import { getRandomOrderNumb } from '../utils/random';
import { Button, Card, Row, Col } from 'react-materialize';


const letters = /^[A-Za-z]+$/;

export const OrderForm = (props) =>{

    // return <a>TODO</a>
    
    let order, setOrder, orderNumber, setOrderNumber, error, setError, emailAddress, setEmailAddress,
        name, setName, address, setAddress, phone, setPhone, passport, setPassport,  formRef, setFormRef, comment, setComment;
    [order,setOrder]=useState({
                orderNumber: getRandomOrderNumb(),
                emailAddress: '',
                name: '',
                address: '',
                passport: '',
                phone: '',
                comment: ''
            });
    [error,setError]=useState({errorId:'',errorName:'',errorEmail:'',errorSalary:''});
    [emailAddress,setEmailAddress]=useState({value:'',controlError: 0});
    [name,setName]=useState({value:'',controlError: 0});
    [address,setAddress]=useState({value:'',controlError: 0});
    [phone,setPhone]=useState({value:'',controlError: 0});
    [passport,setPassport]=useState({value:'',controlError: 0});
    [comment, setComment] = useState({value:'',controlError: 0});
    [orderNumber, setOrderNumber] = useState({value:''});
    [formRef,setFormRef]=useState(null);

    function submit(event) {
        event.preventDefault();
        if (!props.addOrderFn(order)) {
            error.errorOrderNumber = `Order ${order.orderNumber} already exists`;
            orderNumber={value:order.orderNumber}
            error=error.errorOrderNumber;
        }
        formRef.reset();
        setFormRef(null);
        setError({...error});
    }

    useEffect(()=> {
        setOrder(order);
        setPhone(phone);
        setName(name);
        setEmailAddress(emailAddress);
        setAddress(address);
        setComment(comment);
        setPassport(passport);
    },[error])


  function  handlerName(event) {
        name = event.target.value;
        error={errorName:''}
        if(name ==""){
            name={value:name,controlError: 0}
            order.name = name.value;
          
        }else if (name.length < nameMinLength) {
            error={errorName: 'Minimal name length should be '
                + nameMinLength+'symbol'}
            name={value:name,controlError: -1}
            order.name = name.value;
   
        }  else if(!name.match(letters)) {
            error={errorName:'Name mast content only english letters'}
            name={value:name,controlError: -1}
            order.name = name.value;
           
        }
        else {
            error={errorName:''}
            name={value:name,controlError: 1}
            order.name = name.value;
          
        }
      setError({...error})
        }

   function handlerNonValidated(event) {
        order[event.target.name] = event.target.value;
       setError({...error})
    }
  function  handlerEmail(event) {
        emailAddress = event.target.value;
        error={errorEmail:''}
        const format = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (emailAddress == "") {
            emailAddress={value:emailAddress,controlError: 0}
            order.emailAddress = emailAddress;
        } else if (!format.test(emailAddress)) {
            error={errorEmail:'Wrong email format'}
            emailAddress={value:emailAddress,controlError: -1}
            order.emailAddress = emailAddress;
        } else {
            error={errorEmail:''}
            order.emailAddress = emailAddress;
            emailAddress={value:emailAddress,controlError: 1}
        }

      setError({...error})
    }
    function  handlerPhone(event) {
         phone = event.target.value;
        error={errorPhone:''}
        const format = "^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$";

        if (phone == "") {
            phone={value:phone,controlError: 0}
            order.phone = phone;
        // } else if (!format.test(phone)) {
        //     error={errorPhone:'Wrong phone format'}
        //     phone={value:phone,controlError: -1}
        //     order.phone = phone;
        } else {
            error={errorPhone:''}
            order.phone = phone;
            phone={value:phone,controlError: 1}
        }

      setError({...error})
    }
    function  handlerPassport(event) {
        passport = event.target.value;
        error={errorPassport:''}

        if (passport == "") {
            passport={value:passport,controlError: 0}
            order.passport = passport;
        } else if (passport.length!=9) {
            error={errorPassport:'Wrong passport number'}
            passport={value:passport,controlError: -1}
            order.passport = passport;
        } else {
            error={errorPassport:''}
            order.passport = passport;
            passport={value:passport,controlError: 1}
        }

      setError({...error})
    }
   function validate() {
        const res =  notErrors() && allFields();
        return res;
    }

       
    function notErrors() {
        return Object.values(error)
            .reduce((res, field) => {
                return res && !field
            } , true)
    }

    function allFields() {
        return Object.values(order)
            .reduce((res, field) => {
                return res && field
            } , true)
    }
        return  <div className="content">
            <div className="center">
        <h2 style={{color:"#ee6e73", marginTop:"5vh"}}>Order # {order.orderNumber}</h2>
            </div>
            <div className="row" style={{width:"60%"}}>
                <form className="col s12" ref={(ref) => formRef = ref} onSubmit={submit}>
                    {getInputElement('text',
                        'name', 'Name',
                        handlerName,error.errorName,name,'account_circle')}
                    {getInputElement('email',
                        'emailAddress', 'Email',
                       handlerEmail,error.errorEmail,emailAddress,'email')}
                    {getInputElement('text',
                        'phone', 'Phone number',
                        handlerPhone,error.errorPhone,phone,'phone')}
    
                    {getInputElement('text',
                        'address', 'Address',
                        handlerNonValidated,"",address,'home')}
                    {getInputElement('text',
                        'passport', 'Passport',
                        handlerPassport,error.errorPassport,passport,'local_library')}
            
                    {getInputElement('text',
                        'comment', 'Comment',
                        handlerNonValidated,error.errorOrderNumber,comment,'comment')}
                    <button type="submit" name="action" className="btn waves-effect waves-light"
                            disabled={!validate()}
                            > <i class="material-icons right">send</i>Submit
                        </button>
                
                </form>
            </div>
        </div>
    }