import React, { useEffect } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import { loadUserStories } from '../../redux/actions/storyActions';
import { useDispatch, useSelector } from 'react-redux';
import StoryActions from './StoryActions';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utlis';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}))(TableCell);

function UserStories() {
  const user = useSelector((state) => state.auth.user);
  const stories = useSelector((state) => state.stories.userStories);
  const isLoading = useSelector((state) => state.stories.userStoriesAreLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserStories(user._id));
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <hr />
        {stories.length > 0 ? (
          <Table size='small'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stories.map((story) => (
                <TableRow key={story._id}>
                  <TableCell>
                    <Link to={`/stories/s/${story._id}`}>{story.title}</Link>
                  </TableCell>
                  <TableCell>
                    {formatDate(story.createdAt, 'MMM Do YYYY, hh:mm:ss A')}
                  </TableCell>
                  <TableCell>{story.status}</TableCell>
                  <TableCell>
                    <StoryActions storyId={story._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No stories</p>
        )}
      </>
    );
  }
}

export default UserStories;
