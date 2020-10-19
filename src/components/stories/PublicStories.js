import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadPublicStories } from '../../redux/actions/storyActions';
import { stripTags, truncate } from '../../utlis';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'relative',
    marginTop: 20,
    height: 250,
    width: 200,
  },
  cardContent: {
    textAlign: 'center',
    paddingBottom: '10px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5px',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function PublicStories() {
  const isLoading = useSelector(
    (state) => state.stories.publicStoriesAreLoading
  );
  const user = useSelector((state) => state.auth.user);
  const stories = useSelector((state) => state.stories.publicStories);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadPublicStories());
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  } else {
    console.log(stories);
    return (
      <div>
        <h2>Public Stories</h2>
        <Grid container justify='flex-start' spacing={2}>
          {stories.map((story) => (
            <Grid key={story._id} item>
              <Card elevation={3} className={classes.paper}>
                <CardContent className={classes.cardContent}>
                  <h3 className='story-title'>{story.title}</h3>
                  <Chip
                    label={story.user.displayName}
                    avatar={
                      <Avatar
                        src={story.user.image}
                        alt={story.user.displayName}
                      />
                    }
                  />
                  <br />
                  <small>{truncate(stripTags(story.body), 60)}</small>
                  <CardActions className={classes.cardActions}>
                    <Link to={`/stories/s/${story._id}`} className='brand-logo'>
                      <Button size='small' variant='contained' color='primary'>
                        Read More
                      </Button>
                    </Link>
                    {story.user._id == user._id && (
                      <Link
                        title='Edit'
                        to={`/stories/edit/${story._id}`}
                        className='brand-logo'
                      >
                        <Fab size='small' variant='round'>
                          <Edit />
                        </Fab>
                      </Link>
                    )}
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default PublicStories;
