import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { alertErrors } from '../../redux/actions/alertActions';
import { CircularProgress } from '@material-ui/core';
import { formatDate } from '../../utlis';
import ReactDOMServer from 'react-dom/server';
import { Parser } from 'html-to-react';
import StoryActions from './StoryActions';

function SingleStory() {
  const [story, setStory] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const dispatch = useDispatch();
  var htmlToReactParser = new Parser();

  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/stories/${params.storyId}`,
          { withCredentials: true }
        );
        setStory(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        dispatch(
          alertErrors(err.response?.data.error, 'SINGLE_STORY_LOAD_FAIL')
        );
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return <CircularProgress />;
  } else {
    const htmlBody = story.body;
    const reactElement = htmlToReactParser.parse(htmlBody);

    return (
      <>
        {story && (
          <div>
            <h1>{story.title}</h1>
            <small>
              Story posted by {story.user.displayName} on{' '}
              {formatDate(story.createdAt, 'Do MMM YYYY')}
            </small>
            <p>{reactElement}</p>
            {story.user._id == user._id && <StoryActions storyId={story._id} />}
          </div>
        )}
      </>
    );
  }
}

export default SingleStory;
