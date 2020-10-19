import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { alertErrors, clearAlerts } from '../../redux/actions/alertActions';
import { useEffect } from 'react';

function AddStory() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('public');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/stories`,
        { title, body, status },
        { withCredentials: true }
      );
      console.log(res);
      setTitle('');
      setBody('');
      setStatus('public');
      history.push('/');
    } catch (err) {
      dispatch(alertErrors(err.response?.data.error, 'ADD_STORY_FAIL'));
    }
  };
  useEffect(() => {
    dispatch(clearAlerts());
  }, []);

  return (
    <div>
      <h1>Add Story</h1>
      <div className='row'>
        <form onSubmit={handleSubmit} className='col s12'>
          <div className='form-control'>
            <TextField
              id='title'
              label='Title'
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='form-control'>
            <TextField
              select
              label='Status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value='public'>Public</MenuItem>
              <MenuItem value='private'>Private</MenuItem>
            </TextField>
          </div>

          <h5>Tell Us Your Story:</h5>
          <CKEditor
            editor={ClassicEditor}
            data={body}
            onInit={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setBody(data);
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />

          <div style={{ marginTop: '10px' }}>
            <Button
              size='small'
              variant='contained'
              type='submit'
              color='primary'
            >
              Save
            </Button>
            <Link to='/' style={{ textDecoration: 'none', marginLeft: '5px' }}>
              <Button size='small' variant='contained'>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStory;
