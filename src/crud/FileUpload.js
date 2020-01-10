import React, { useState, Fragment, Component, useEffect } from "react";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { useRoutes, A } from "hookrouter";


import { Paper, Button, Grid, TextField, Checkbox, InputLabel, MenuItem, FormHelperTex, FormControl, Select, Radio, RadioGroup, FormControlLabel,
FormLabel, Typography, IconButton } from "@material-ui/core";

import PhotoCamera from "@material-ui/icons/PhotoCamera";

import axios from 'axios';

import useStyles from "../useStyles";


import PropTypes from 'prop-types';

const url = "http://localhost:9000/students";




const Message = ({ msg }) => {
  return (
    <div className='alert alert-info alert-dismissible fade show' role='alert'>
      {msg}
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};


const Progress = ({ percentage }) => {
  return (
    <div className='progress'>
      <div
        className='progress-bar progress-bar-striped bg-success'
        role='progressbar'
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

Progress.propTypes = {
  percentage: PropTypes.number.isRequired
};


const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);


  const classes = useStyles();

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
<div className='custom-file mb-4'>
      <form onSubmit={onSubmit}>

      <input
        type='file'
        className='custom-file-input'
        id='customFile'   accept="image/*"
        onChange={onChange}
      />
      <label className='custom-file-label' htmlFor='customFile'>
        {filename}
      </label>
<p></p>
        <Progress percentage={uploadPercentage} />
    {/*    <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />*/}
      </form>

      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
    ) : null}</div>
    </Fragment>
  );
};

export default FileUpload;
