import BlogImage from 'assets/images/home/blog_test_2.webp';
import ContactImage from '../../assets/images/home/contact_me.webp';
import SubdomainsImage from '../../assets/images/home/subdomains.webp';
import { Link } from '@tanstack/react-router';

import './_Dashboard.scss';
import { Grid } from '../../components/utility/grid';

import Text from '../../components/utility/text';
import { Padding } from '../../components/utility/padding';
import { ProfileTile } from './profile-tile';
import { Border } from '../../components/utility/border';
import { Shine } from '../../components/css/shine';
import Posts from '../blog/menu/posts/posts';
import { HoverFollow } from '../../components/hover';
import { ConditionalRender } from '../../components/conditionalRender/turneryRender';
import { PostsCard } from '../blog/menu/posts/postcard';
import { useGetPostsOrDraftsQuery } from '../blog/menu/posts/queries';
import { useStore } from '../../functionality/state/state';
import { Subset } from '../../components/utility/subset';
import { useState } from 'react';
import { Button } from '../../components/Button';
import Flex from '../../components/utility/flex';

export const Dashboard = () => {
  return (
    <div className='home_outer'>
      <div className='background'>
        <div>
          <Link className='active' to='/subdomains'>
            <img src={SubdomainsImage} alt="test"/>
            <h1 className='title first'>Services</h1>
          </Link>
          <Link className={'active'} to='/contact'>
            <img src={ContactImage} alt="test"/>
            <h1 className='title second'>Contact</h1>
          </Link>
          <Link className='active' to='/blog'>
            <img src={BlogImage} alt="test"/>
            <h1 className='title third'>Blog</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}

const Achievement = ({ title, children }) => {
  return (
    <Border no-overflow all radius={8}>
      <Shine full-height>
        <Padding all={12}>
          <Text size-sm remove-margin bold lead-md>{title}</Text>
          <Text remove-margin size-xs>{children}</Text>
        </Padding>
      </Shine>
    </Border>
  )
}

const Achievements = () => {
  const [showAll, setShowAll] = useState(false)
  
  return (
    <Padding top={20}>
      <Padding bottom={20}>
        <Flex gap={5} align-center>
          <Text.Heading remove-margin level={3} size-xl>
            Achievements
          </Text.Heading>
          <Button onClick={() => setShowAll(!showAll)}>Show All</Button>
        </Flex>
      </Padding>
      <Grid columns={["1fr", "1fr", "1fr"]} gap={5}>
        <Subset count={showAll ? Infinity : 3}>
          <Achievement title="Typed up">Write a multi-line type</Achievement>
          <Achievement title="Not so junior">Industry Software Engineer for 1 year</Achievement>
          <Achievement title="Re:Router">Convert an application to tanstack router</Achievement>
          <Achievement title="Meet the Tanman">Have Tanner Linsley respond to a discussion post</Achievement>
          <Achievement title="Self Hosted">Host Software from a dedicated home server</Achievement>
        </Subset>
      </Grid>
    </Padding>
  )
}

const RecentArticles = () => {
  const [{ draftMode }] = useStore();
  const { isLoading, data, error } = useGetPostsOrDraftsQuery(draftMode)

  return (
    <>
      <Text.Heading level={3} size-xl>Recent Articles</Text.Heading>
      <HoverFollow onSize={['md', 'lg', 'xl', 'dual-lg', 'dual-xl', 'dual-xxl']}>
        {({ onMouseOver, onMouseLeave }) => (
          <ConditionalRender condition={!isLoading && !error}>
            {data?.map((post) => (
              <PostsCard
              key={post._id}
              post={post}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
              />
            ))}
          </ConditionalRender>
        )}
      </HoverFollow>
    </>
  )
}

const DashboardContent = () => {
  return (
    <div className='DashboardContent'>
      <Achievements />
      <RecentArticles />
    </div>
  )
}

export const Dashboard2 = () => {
  return (
    <div className='Dashboard2'>
      <Grid columns={["auto", "1fr"]} gap={6}>
        <ProfileTile />
        <DashboardContent />
      </Grid>
    </div>
  )
}