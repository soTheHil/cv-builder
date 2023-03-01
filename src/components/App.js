import React from 'react'
import Preview from './Preview'
import userPic from '../profile.png'
import catPic from '../cat.jpg'
import ReactToPrint from 'react-to-print';
const initialState ={
  details:{
    firstName:'',
    lastName:'',
    profession:'',
    email:'',
    address:'',
    phone:'',
    description:` `,
    photo:userPic
},
experience:[
    {
        position:'',
        company:'',
        city:'',
        from:'',
        to:''
    },
   
],
education:[
  {
    collegeName:'',
    city:'',
    degree:'',
    field:'',
    from:'',
    to:''
  }
]
}
const loadState = {
    details:{
        firstName:'Joe',
        lastName:'Cat',
        profession:'Mechanical Engineer',
        email:'joewood@gag.com',
        address:'902 Nightridge Circle',
        phone:'032 594 3024',
        description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco laboris nisi ut `,
        photo:catPic
    },
    experience:[
          {
            position:'Web Developer',
            company:'Star Gate',
            city:'Durban',
            from:'2022',
            to:'Present'
        },
        {
            position:'Senior Engineer',
            company:'Sasol Inc',
            city:'Durban',
            from:'2020',
            to:'2022'
        },
        {
            position:'Junior Engineer',
            company:'Altec',
            city:'Cape Town',
            from:'2018',
            to:'2020'
        }
    ],
    education:[
      {
        collegeName:'University of Natal',
        city:'Durban',
        degree:'Masters',
        field:'Mechanical Engineering',
        from:'2016',
        to:'2018'
      },
      {
        collegeName:'University of Cape Town',
        city:'Cape Town',
        degree:'Bachelors',
        field:'Mechanical Engineering',
        from:'2016',
        to:'2012'
      }
    ]
}

class App extends React.Component {
constructor() {
    super()
    this.updateExperience = this.updateExperience.bind(this)
    this.updateDetails = this.updateDetails.bind(this)
    this.updateEducation = this.updateEducation.bind(this)
    this.addExperience = this.addExperience.bind(this)
    this.addEducation = this.addEducation.bind(this)
    this.reset = this.reset.bind(this)
    this.load = this.load.bind(this)
  }

    state = initialState;

    load() {
      this.setState(loadState)
    }

    reset() {
      this.setState(initialState)
    }

    addExperience(){
      const newExperience = [...this.state.experience]
      newExperience.push({
        position:'',
        company:'',
        city:'',
        from:'',
        to:''
      })
      this.setState({
        experience:newExperience
      })
    }

   addEducation() {
    const newEducation = [...this.state.education]
    newEducation.push({
      collegeName:'',
      city:'',
      degree:'',
      field:'',
      from:'',
      to:''
    })

    this.setState({education:newEducation})
   }

    updateExperience(newExp){
        this.setState((state) => ({
          experience:newExp  
        }))
    }
    
    updateDetails(newDetails) {
      this.setState(state => ({
        details:newDetails
      }))
    }

    updateEducation(newEducation) {
      this.setState((state)=>({
        education:newEducation
      }))
    }

    render() {
        const {details, experience, education} = this.state
        return(
            <>
            <h1 className='title'>CV Builder</h1>
            <div className='cv'>
              <h2>Personal Details</h2>
              <PersonalDetails 
                details = {details}
                updateDetails = {this.updateDetails}
              />
            </div>
            <div className='cv'>
              <h2>Experience</h2>
               {
                experience.map((exp, i) => {
                    return (
                    <AddExperience
                      key={i}
                      id={i}
                      experience={experience}
                      updateExperience={this.updateExperience}
                    />
                    )
                })
               }
               <button className='btnAdd' onClick={this.addExperience}>Add Experience</button>
            </div>
            <div className='cv'>
              <h2>Education</h2>
              {education.map((edu, i) => {
                return <Education 
                  key={i}
                  id={i}
                  updateEducation={this.updateEducation}
                  education={education}
                />
              })}
              <button className='btnAdd' onClick={this.addEducation}>Add Education</button>
            </div>
            <button className='btnLoad' id='load1' onClick={this.load}>Load Example</button>
            <button className='btnLoad' id='load2' onClick={this.reset}>Reset</button>
            
            <ReactToPrint
          trigger={() => {
            return <button className='btnLoad' id='load3'>Download PDF</button>;
          }}
          content={() => this.componentRef}
        />
            <Preview ref={el => (this.componentRef = el)} {...this.state}/>
            </>
        )
    }
}

class PersonalDetails extends React.Component {

  onChange = (name) => (e) => {
    const {updateDetails, details} = this.props
    const newDetails = {...details}
    if (name==='photo') {
      const currentFile = e.target.files[0]
      newDetails[name] = URL.createObjectURL(currentFile)
      updateDetails(newDetails)
      return
    }
    newDetails[name] = e.target.value
    updateDetails(newDetails)
  }

  render() {
    const {details} = this.props
    return(
      <>
      <div className='info'>
        {/* {Object.keys(details).map( (key) => {
          return <input
            value={details[key]}
            placeholder={key}
            onChange={this.onChange(key)}
          />
        })} */}
        <input 
          type='text'
          name={"firstName"}
          placeholder={"First Name"}
          value={details.firstName}
          onChange={this.onChange("firstName")}
        />
         <input 
          type='text'
          name={"lastName"}
          placeholder={"Last Name"}
          value={details.lastName}
          onChange={this.onChange("lastName")}
        />
         <input 
          type='text'
          name={"profession"}
          placeholder={"Profession"}
          value={details.profession}
          onChange={this.onChange("profession")}
        />
        <label htmlFor='photo'>Choose A photo</label>
         <input 
          id='photo'
          type='file'
          name='photo'
          onChange={(this.onChange("photo"))}
        />
         <input 
          type='text'
          name={"email"}
          placeholder={"Email"}
          value={details.email}
          onChange={this.onChange("email")}
        />
         <input 
          type='text'
          name={"address"}
          placeholder={"Address"}
          value={details.address}
          onChange={this.onChange("address")}
        />
         <input 
          type='text'
          name={"phone"}
          placeholder={"Phone Number"}
          value={details.phone}
          onChange={this.onChange("phone")}
        />
        <textarea
          placeholder='Description'
          name='description'
          onChange={this.onChange('description')}
          value={details.description}
        >
        </textarea>
        {/* <>
        {Object.keys(details).map( (key, i) => {
            if (key !== 'photo') return <p key={i}>{details[key]}</p>
          }
        )}
        <img src={details.photo} alt='you'/>
        </> */}
      </div>
     
      </>
    )
  }

}


class AddExperience extends React.Component {
    constructor() {
      super()
      this.delete = this.delete.bind(this)
    }

    delete(){
      const {experience, id, updateExperience} = this.props
      const newExp = experience.filter((exp, i) => {
        return i !== parseInt(id)
      })
      updateExperience(newExp)
    }

    onChange = (name) => (e) => {
        const {experience, id, updateExperience} = this.props
        const i = parseInt(id)
        const newStateExp = [...experience]
        const newExp = {...newStateExp[i]}
        newExp[name] = e.target.value
        newStateExp[i] = newExp
        updateExperience(newStateExp)
    }

    render() {
        const {experience, id} = this.props
        const {position, company, city, from, to} = experience[parseInt(id)]
        return(
            <div className='info'>
              <input 
                value={position} 
                placeholder="Position" 
                onChange={this.onChange('position')}  
              />
              <input 
                value={company} 
                placeholder="Company" 
                onChange={this.onChange('company')}  
              />
             
              <input
                value={city}
                placeholder={'City'}
                onChange={this.onChange('city')}
              />
              <input 
                value={from} 
                placeholder="From" 
                onChange={this.onChange('from')}  
              />
              <input
                value={to}
                placeholder={'To'}
                onChange={this.onChange('to')}
              />
              {/* <p>Current profession: {position}</p>
              <p>Company: {company}</p>
              <p>City: {city}</p>
              <p>From: {from}</p>
              <p>To: {to}</p> */}
              <button type='button' onClick={this.delete}>Delete</button>
            </div>
        )
    }
}

class Education extends React.Component{
  constructor() {
    super()
    this.delete = this.delete.bind(this)
  }

  delete() {
    const {education, updateEducation, id} = this.props
    const newEducation = education.filter((edu, i) => {
      return i !== parseInt(id)
    })
    updateEducation(newEducation)
  }

  onChange = (name) => (e) => {
    const {education, updateEducation, id} = this.props
    const newEducation = [...education]
    const currEdu = {...newEducation[parseInt(id)]}
    currEdu[name] = e.target.value
    newEducation[parseInt(id)] = currEdu
    updateEducation(newEducation)
  }

  render() {
    const {education, id} = this.props
    const currEdu = education[parseInt(id)]
    return(
      <>
      <div className='info'>
        <input
          type='text'
          name='collegeName'
          placeholder='University Name'
          value={currEdu['collegeName']}
          onChange={this.onChange('collegeName')}
        />
        <input
          type='text'
          name='city'
          placeholder='City'
          value={currEdu['city']}
          onChange={this.onChange('city')}
        />
        <input
          type='text'
          name='degree'
          placeholder='Degree'
          value={currEdu['degree']}
          onChange={this.onChange('degree')}
        />
        <input
          type='text'
          name='field'
          placeholder='Field'
          value={currEdu['field']}
          onChange={this.onChange('field')}
        />
        <input
          type='text'
          name='from'
          placeholder='From'
          value={currEdu['from']}
          onChange={this.onChange('from')}
        />
        <input
          type='text'
          name='to'
          placeholder='To'
          value={currEdu['to']}
          onChange={this.onChange('to')}
        />
        {/* <>
        {Object.keys(currEdu).map((key,i) => {
        return <p key={i}>{currEdu[key]}</p>
       })}
        </> */}
        <button type='button' onClick={this.delete}>Delete</button>
      </div>
      </>
    )
  }
}

export default App