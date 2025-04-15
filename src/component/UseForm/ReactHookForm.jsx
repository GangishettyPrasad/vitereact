import { Tabs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"


const ReactHookForm = ()=>{

    const {register,handleSubmit,watch,formState:{errors}} =useForm()
      const onSubmit = (data) => console.log(data)
    
    //  console.log(watch("example")) // watch input value by passing the name of it
    const designationNames = [{name : "prasad"}]
   const  workInfoOnBtnClick = true
    return(
        <>
            <div>
                <h3>React Form </h3>
            
            </div>


             {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
             <form onSubmit={handleSubmit(onSubmit)}>
    
            <input type ="text" {...register('firstname' , {required:true , minLength : 10 , maxLength:15})}/>  {errors.firstname && <>please enter</>}<br/>
            <input type="number" {...register("age", { min: 18, max: 99 })} />  {errors.age && <>please enter</>}<br/>
          
            <input 
           
             disabled={workInfoOnBtnClick ? true : false}
             {...register("designation", {
                required: "This field is required",
              //  pattern: /^[A-Za-z]+$/i ,
                pattern: {
                    value: /^[A-Za-z][A-Za-z-\s]+$/,
                    message: "Please enter valid first name", // JS only: <p>error message</p> TS only support string
                }

              })}
             
              />
              <select
            //</form>  onChange={(e) => { changeDepartmentforSub(e.target.value); setError1('department', { type: 'custom', message: "" });; setValue1("subDepartment", '') }}
           // onClick={() => workInfoOnClick()}
           //onKeyUp={() => { trigger("firstNameOnB_P"); }}
            >

                  <option value=''>--Select Designation--</option>
                  {designationNames.map((item, j) => {
                    return (
                      <option value={item.id} key={j}>
                        {item.name}
                      </option>
                    );
                  })}

                {/* {subDepartments && subDepartments.map((item, id) => { return (
                    <option value={item.id} key={id}>
                        {item.name}
                    </option>)  })} */}
                
                </select>

            <select {...register('gender')}
          //  value={viewemp.designation}
            >
                    <option value='male'> male</option>
                    <option value='female'>female</option>
                    <option value ='other'>other</option>
            </select>
         
            <input type='text'
                placeholder='Phone' autoComplete="off"
                {...register("phoneOnB_P", {
                    required: "This field is required",
                    pattern: {
                        value:
                            /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
                        message: "Please enter a valid mobile number.",
                    },
                    minLength: {
                        value: 10,
                        message: "Please enter Min and Max 10 digits ",
                    },
                    maxLength: {
                        value: 10,
                        message: "Please enter Min and Max 10 digits ",
                    },
                })}
                // onKeyUp={(e) => {
                //     trigger("phoneOnB_P");
                //     setmobileNumberError(false)
                //     checkMobileNumberValid(e.target.value)
                //     seterrmsg('')
                // }}

                
     />

        {/* <input type='file' 
            accept="image/png, image/jpeg,image/jpg" {...register("selectEmpPhotoFile")} 
            onChange={(e) => {
                trigger("selectEmpPhotoFile");
                onEmpImageValue(e);
            }}
        /> */}

{/* const removeFileFromHere = () => {
        setValue("selectEmpPhotoFile", "");
        setHaveImage(false);
    }; */}

{/* {HaveImage ? (
                <div className='text-start'>
                    <p className="mt-3" style={{ lineBreak: "anywhere" }}> <a
                        href={window.location.host.includes("whytelglobal.com") || window.location.host.includes("indianhr.in") || window.location.host.includes("indianpayrollservice.com") || window.location.host.includes("bharatpayroll.com") ? `${window.location.origin}/qxbox/media/` : process.env.REACT_APP_TEST_MEDIA_LOAD}
                        download
                        target='_blank'
                        rel='noreferrer'
                    >
                        {imageName}

                    </a> <span className='text-danger' onClick={() => removeFileFromHere()}> <i className='fa fa-close'></i> </span>
                    </p>

                </div>
            ) : ("")
} */}

{/* <div className="form-group demo-masked-input">
                          <label className="fancy-radio mb-3 custom-color-blue">
                            <input
                              name="flat_amount"
                              
                              disabled={isViewData ? true : false}
                              {...register("calculationType")}
                              onChange={(e) =>
                                setselectedCalculationType(e.target.value)
                              }
                              value={1}
                              checked={selectedCalculationType == 1 ? true : false}
                              type="radio"
                              data-parsley-multiple="flat_amount"
                            />
                            <span className="font-16">
                              <i></i>Flat Amount
                            </span>
                          </label>
                          <br />
                          <label className="fancy-radio mb-3 custom-color-blue">
                            <input
                              name="flat_amount"
                            
                              disabled={isViewData ? true : false}
                              {...register("calculationType")}
                              onChange={(e) =>
                                setselectedCalculationType(e.target.value)
                              }
                              value={2}
                              type="radio"
                              checked={selectedCalculationType == 2 ? true : false}
                              data-parsley-multiple="flat_amount"
                            />
                            <span className="font-16">
                              <i></i>Percentage of Basic
                            </span>
                          </label>
</div> */}

<input type='submit'/>
    </form>

    
             <h5> back to react <Link   to = '/myTabs'>react</Link> </h5>
        </>
       
    )
}

export default ReactHookForm