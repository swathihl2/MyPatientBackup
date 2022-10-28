import React from 'react'
import { useState } from 'react';
import instance from "../../firebase/instance";
import { Button } from '@material-ui/core';
import "./patient.css"
import { TextField, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Bloods, Genders } from "../../helpers/PatientInformation";

const PatientList = () => {

    const [namelist, setNameList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [updateForms, setUpdateForms] = useState("");

    async function submitForm(id, data) {
        var DateOfBirth = String(data.DateOfBirth.getDate()) + "-" + String(parseInt(data.DateOfBirth.getMonth()) + 1) + "-" + String(data.DateOfBirth.getFullYear());
        await instance.put('/patients/' + id + ".json", {
            PatientName: data.PatientName,
            Address: data.Address,
            DateOfBirth: DateOfBirth,
            Disease: data.Disease,
            PatientPhone: data.PatientPhone,
            bloodGroup: data.bloodGroup,
            gender: data.gender
        }).then((resopnse) => {
            if (resopnse.status !== 200) {
                alert("Something went Wrong")
            }
            return resopnse.status
        }).catch(() => {
            alert("Something went Wrong")
        })
        getLists("")
    }

    function updateForm(id) {
        instance.get('/patients/' + id + ".json").then((res) => {
            var data = []
            const handleDateChange = (date) => {
                data.DateOfBirth = date;
            }
            const handleBloodChange = (e) => {
                data.bloodGroup = e.target.value
            }
            const handleGenderChange = (e) => {
                data.gender = e.target.value
            }
            if (res.status === 200) {
                for (let i in res.data) {
                    data[i] = res.data[i]
                }
                const [day, month, year] = res.data.DateOfBirth.split('-')
                var ndate = year + "-" + month + "-" + day
                data["DateOfBirth"] = new Date(ndate)
                console.log(res)
                setUpdateForms(
                    <>
                        <form className="form-container form-popup" id="myForm">
                            <center><h2>Update</h2></center>
                            <TextField fullWidth required label='Name' defaultValue={data.PatientName} name="PatientName" onChange={(e) => { data.PatientName = e.target.value }} placeholder="Enter your name" />
                            <TextField fullWidth required defaultValue={data.PatientPhone} label='Phone Number' name="PatientPhone" onChange={(e) => { data.PatientPhone = e.target.value }} placeholder="Enter your phone number" />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    required
                                    defaultValue={new Date(ndate)}
                                    format="dd/MM/yyyy"
                                    onChange={handleDateChange}
                                    label="Birth Date"
                                    showTodayButton
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>
                            <TextField fullWidth required
                                id="blood"
                                select
                                label="Blood Group"
                                defaultValue={data.bloodGroup}
                                onChange={(e) => { data.bloodGroup = e.target.value; handleBloodChange(e) }}
                                variant="standard"
                                align="left"
                            >
                                {Bloods.map((option) => (
                                    <MenuItem key={option.value} value={option.value} >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth required
                                id="gender"
                                select
                                label="Gender"
                                defaultValue={data.gender}
                                onChange={(e) => { data.gender = e.target.value; handleGenderChange(e) }}
                                variant="standard"
                                align="left"
                            >
                                {Genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value} >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth label='Address' defaultValue={data.Address} id="address" onChange={(e) => { data.Address = e.target.value; }} type='text' />
                            <TextField fullWidth defaultValue={data.Disease} required label='Disease Name' id="disease" onChange={(e) => { data.Disease = e.target.value }} type='text' />
                            <button onClick={(e) => { e.preventDefault(); setUpdateForms(""); submitForm(id, data) }} className="btn">Update</button>
                            <button className="btn cancel" onClick={(e) => { setUpdateForms(""); e.preventDefault() }}>Close</button>
                        </form>
                    </>
                )
            }
            else {
                alert("Something went Wrong")
            }
        })
    }

    async function removePatient(e, event) {
        event.preventDefault()
        await instance.delete('/patients/' + e + ".json").then((resopnse) => {
            if (resopnse.status !== 200) {
                alert("Something went Wrong")
            }
        }).catch(() => {
            alert("Something went Wrong")
        })
        getLists("")
    }

    const getLists = () => {
        instance.get('/patients.json').then((resopnse) => {
            let listofname = []
            var j = 0
            setNameList([])
            for (let i in resopnse.data) {
                j = j + 1
                if ((String(resopnse.data[i].PatientName).toLowerCase()).includes(searchText.toLowerCase()) || searchText === "") {
                    listofname.push(
                        <tr id={i} style={{ padding: "15px", minHeight: "50px" }} className="trow">
                            <td className="searchtd" style={{ width: "10px" }}>{j}</td>
                            <td className="searchtd">{resopnse.data[i].PatientName}</td>
                            <td className="searchtd">{resopnse.data[i].PatientPhone}</td>
                            <td className="searchtd" >{resopnse.data[i].DateOfBirth}</td>
                            <td className="searchtd" style={{ width: "15px" }}>{resopnse.data[i].bloodGroup}</td>
                            <td className="searchtd" style={{ width: "20px" }}>{resopnse.data[i].gender}</td>
                            <td className="searchtd">{resopnse.data[i].Address}</td>
                            <td className="searchtd">{resopnse.data[i].Disease}</td>
                            <td className="searchtd"><form action="/patient">
                                <Button fullWidth onClick={() => { updateForm(i) }} id="updateBtn">Update</Button></form></td>
                            <td className="searchtd"><form action="/patient" >
                                <Button fullWidth onClick={(event) => removePatient(i, event)} id='deleteBtn'>Delete</Button></form></td>
                        </tr>)
                }
            }
            if (listofname === [] || listofname.length === 0) {
                listofname.push(<tr><td colSpan={10} style={{ textAlign: "center", color: "red", fontSize: "20px" }}>Result not found</td></tr>)
            }
            setNameList(listofname);
        }).catch(() => {
            setNameList(<tr><td colSpan={10} style={{ textAlign: "center", color: "red", fontSize: "20px" }}>Sorry Server down</td></tr>)
        });
    }
    const [flag, setFlag] = useState(1)
    if (searchText === "" && flag === 1) {
        getLists("")
        setFlag(0)
    }

    return (
        <div>
            <div className="nav-content-no right" >
                <input style={{ height: "25px" }} onChange={(e) => { setFlag(1); setSearchText(e.target.value); getLists(e.target.value) }} className="searchbar" type="text" placeholder='Search' id="searchbar" />
                <></> <i className="fa fa-search" style={{ color: "black" }}></i>
                <br />
            </div>
            <table id="3" className="searchtable">
                <tbody>
                    <tr className="searchthead">
                        <td style={{ padding: "15px", minHeight: "50px" }}>Sl No</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Name</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Phone</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Date of Birth</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Blood Group</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Gender</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Address</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Disease</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Update</td>
                        <td style={{ padding: "15px", minHeight: "50px" }}>Remove</td>
                    </tr>
                    {namelist}
                </tbody>
            </table>
            {updateForms}
        </div>
    )
}

export default PatientList;