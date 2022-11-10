import React, { useState, useEffect, createRef } from 'react';
import './blog.scss'
import { Link } from 'react-router-dom';
import { Menu } from './menu/menu.js'
import { FlipToggle } from './toggle/toggle'
import Portrait from '../../assets/images/Lleyton.png'
import classNames from 'classnames'
import { useGlobalState } from '../../functionality/globalState';
import axios from 'axios';


const server = process.env.REACT_APP_BACKEND_SERVER ?? 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT ?? '3000';
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL ?? 'http';
const api = `${protocol}://${server}:${port}/api`

const About = () => {
  return (
    <div className="About">
      <div className="circle">
        <img alt={'ViewableGravy Portrait'} src={Portrait}></img>
      </div>
      <p>Hi, my name is Lleyton but online you can call my Gravy. I'm passionate about making things; right now that's in NodeJS and React but I wouldn't turn down a job with C#. Recently I'm entertaining myself with WebSockets, Express API's and learning new SASS skills but I also love Server Administration, automation and writing scripts. I currently Work at <a href="https://ventraip.com.au/">VentraIP Australia</a> as a technical support Representative</p>
    </div>
  )
}


const getPosts = async (setPosts) => {
  try {
    const response = await axios.get(`${api}/blog/posts`);
    setPosts(response.data);
  } catch (error) {
    console.log(error);
  }
}

const getDrafts = async (setPosts) => {
  try {
    const response = await axios.get(`${api}/blog/admin/post/drafts`);
    setPosts(response.data);
  } catch (error) {
    console.log(error);
  }
}

const getWindowDimensions = () => [window.innerWidth, window.innerHeight];
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

//todo - add toggle (+) on left to toggle between on and off rather than just clicking the text
//on mobile this can be hidden and just clicking on an option while closed will toggle the state on (and show a minus to close)
const TagsWrapper = ({ tagDetails }) => {
  // const tags = tagDetails?.map(() => createRef()); //create an array of refs for each tag
  const [wWidth,] = useWindowDimensions();
  let tags = tagDetails?.map((_, i) => ({ index: i, tag: createRef() }))

  let timeout = null; 
  const colors = ['#ce3175', '#4e3d42', '#000000', '#4fb477']

  const incrementTags = (ts) => tags = ts.map(({tag, index}) => ({ tag: tag, index: ++index >= tags.length ? 0 : index }));
  const getFrontTag = (ts) => ts.find(({index}) => index + 1 === ts.length);
  // const resetTagsIndex = (ts) => ts.map(({tag}, index) => ({ tag: tag, index: index }));
  const getTagFromEvent = (e) => tags.find(({tag}) => tag.current === e.target);
  const isFrontTag = (t) => t.index + 1 === tags.length;
  const indexesFromFrontTag = (tag) => getFrontTag(tags).index - tag.index;  
  const resetTagsStyling = (ts) => ts.forEach(({tag}) => {
    tag.current.style.width = null;
    tag.current.style.color = null;
    tag.current.style.zIndex = null;
    tag.current.style.right = null;
  });

  const tagHoverDesktop = () => {
    if (wWidth > 576) {
      const widths = tags.map(({tag}) => tag.current.offsetWidth);
      tags.forEach(({tag}, index) => {
        //culmination of widths before this one
        const totalWidth = widths.slice(0, index).reduce((a, b) => a + b + 10, 0);

        //how far to the right
        tag.current.style.right = `${totalWidth}px`;
      });
    }
  }

  const rotateTags = (increment) => {
    if (wWidth < 576 && wWidth > 380) {
      if (!increment) 
        incrementTags(tags)
      else 
        for (let i = 0; i < increment; i++)
          incrementTags(tags)

      const front = getFrontTag(tags);

      front.tag.current.style.width = null;
      front.tag.current.style.color = null;

      tags?.forEach(({tag, index}) => {
      
        tag.current.style.right = `${index * 10}px`
        tag.current.style.zIndex = index;

        if (front.index === index) {
          tag.current.style.width = null;
        } else {
          tag.current.style.width = `${front.tag.current.offsetWidth - 8 - 8 - 10}px`;
          tag.current.style.color = 'transparent';
        }
      });
    }
  }

  const tagDefault = () => {
    resetTagsStyling(tags);

    tags?.forEach(({tag, index}) => {
      // only apply this styling on normal mobile and desktop (not tiny mobile)
      if (tag.current && wWidth > 380) {
        tag.current.style.right = `${index * 10}px`;
        tag.current.style.zIndex = index;
      }
    })
  }

  const mouseOver = () => {
    tagHoverDesktop();
    if (timeout) {
      clearTimeout(timeout);
      timeout = null; 
    }
  }

  const mouseLeave = () => {
    if (wWidth >= 576) {
      timeout = setTimeout(() => {
        tagDefault();
      }, 500);
    }
  }

  const tagClick = (e) => {
    if (wWidth >= 576) return

    const tag = getTagFromEvent(e);
    if (!isFrontTag(tag)) {
      rotateTags(indexesFromFrontTag(tag));
      e.preventDefault();
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tagDefault(); }, [wWidth]);

  useEffect(() => {
    tagDefault();

    //until this is specified in database, select a random colour for tag
    tags?.forEach(({tag}) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      tag.current.style.backgroundColor = color;
      colors.splice(colors.indexOf(color), 1);
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={'tags'}> 
        {
          tagDetails && tagDetails.map((tag, index) => 
          <Link 
            ref={tags[index].tag} 
            to={'/'} 
            className={`tag`} 
            onMouseEnter={mouseOver} 
            onMouseLeave={mouseLeave}
            onClick={tagClick}
          >
            {tag}
          </Link>)
        } 
      </div>
    </>
  )
}

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [toggleState, setToggleState] = useState('Published');
  const [state, ] = useGlobalState();

  useEffect(() => {
    toggleState === 'Published' 
      ? getPosts(setPosts) 
      : getDrafts(setPosts);
  }, [toggleState])

  useEffect(() => {
    getPosts(setPosts);
  }, [])

  const changeToggle = () => {
    toggleState === 'Published'
      ? setToggleState('Drafts')
      : setToggleState('Published');
  }

  return (
    <>
      <div id="posts-head">
        <h1 id="posts-title">Posts</h1>
        { state.token && <FlipToggle className="FlipToggle" onChange={changeToggle}/> }  
      </div>

      <ul className="posts">
        { posts && posts.map((post) =>
            <li className='blog-item' key={post._id}>
              <Link to={`/blog/${post.slug}`} className='title_container'>
                <h2 className='title'>{post.title}</h2>
                <p className={'summary'} dangerouslySetInnerHTML={{ __html: post.summary }}></p>
              </Link>
              <div className='right-section'>
                <p className='date'>{post.date}</p>
                <TagsWrapper tagDetails={post.tags}/>
              </div>
            </li>
          )
        }
      </ul>
    </>
  )
}

export const Blog = () => {  
  const [mobileView, setMatches] = useState(window.matchMedia("(max-width: 576px)").matches)
  const [menuOpen,] = useState(false); //use to change menu state of mobile burger menu
  const [, setMenuItems] = useState(classNames({
    desktop: true,
    mobile: false,
    open: false
  }))

  useEffect(() => {
    setMenuItems(classNames({
      desktop: !mobileView,
      mobile: mobileView,
      open: menuOpen
    }))
  }, [mobileView, menuOpen])

  useEffect(() => {
    window
      .matchMedia("(max-width: 576px)")
      .addEventListener('change', e => setMatches( e.matches ))
  }, [])

  return (
    <div id="blog_container">
      <div id="outer">
        <div id="background">
          <Menu author="ViewableGravy" /> {/* add option to customize links */}
          <About/>
          <Posts/>
        </div>
      </div>
    </div>
  )
}

{/* <h1>Steal the layout from this site: https://www.iamtimsmith.com/blog/using-mongodb-with-express-js</h1>
        <h1>Steal the Z from this site: https://zellwk.com/blog/crud-express-mongodb/</h1>
        <h1>Steal something from this site: https://flaviocopes.com/rest-api-express-mongodb/</h1> */}

export default Blog;