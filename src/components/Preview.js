import React from 'react'

export default class Preview extends React.Component{
  render(){
    const {details, experience, education} = this.props
        return(
            <div id='preview'>
                <header>
                    <div>
                    <h1>{details.firstName} {details.lastName}</h1>
                    <h2>{details.profession}</h2>
                    </div>
                    <img src={details.photo} alt='user'/>
                </header>
                <div className='cv-body'>
                    <div className='history'>
                        <h2>Work Experience</h2>
                        {experience.map((exp, i) => {
                            return (
                                <div key={i} className='experience'>
                                    <h3>{exp.position}</h3>
                                    <p>{exp.company}, {exp.city}</p>
                                    <span>{exp.from} - {exp.to}</span>
                                </div>
                            )
                        })}
                        <h2>Education</h2>
                        {education.map((edu, i) => {
                            return (
                                <div key={i} className='education'>
                                    <h3>{edu.collegeName}, {edu.city}</h3>
                                    <p>Degree: {edu.degree}</p>
                                    <p>Field: {edu.field}</p>
                                    <span>{edu.from} - {edu.to}</span>

                                </div>
                            )
                        })}
                    </div>
                    <div className='personal'>
                        <h2>Contact</h2>
                        <p>{details.address}</p>
                        <p>{details.phone}</p>
                        <p>{details.email}</p>
                        <h2>Summary</h2>
                        <p>{details.description}</p>
                    </div>
                </div>
                
            </div>
        )
  }
}