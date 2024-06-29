import { useState, useEffect } from 'react';
import BlogImage from 'assets/images/home/blog_test_2.webp';
import ContactImage from '../../assets/images/home/contact_me.webp';
import SubdomainsImage from '../../assets/images/home/subdomains.webp';
import { Link } from '@tanstack/react-router';

import './_Dashboard.scss';
import { Grid } from '../../components/utility/grid';

import ProfileImage from 'assets/images/Lleyton.png'
import Text from '../../components/utility/text';
import { Padding } from '../../components/utility/padding';
import Flex from '../../components/utility/flex';
import { Anchor } from '../../components/Anchor';
import { Icons } from '../blog/menu/posts/_socials';
import { Border } from '../../components/utility/border';

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

const ProfileTile = () => {
  return (
    <div className='ProfileTile'>
      <img className="ProfileTile__avatar" src={ProfileImage} />
      <Padding margin block="medium" >
        <Text.Heading lead-1 size-lg remove-margin level={2}>Lleyton Morris</Text.Heading>
      </Padding>
      <Text customColor='tertiary' remove-margin bold>ViewableGravy</Text>
      <Text lead-md secondary>
        Lleyton is a frontend software developer at Nexigen Digital with a passion for 
        Typescript and everything Tanstack. He's focused on becoming the best type 
        developer possible and is always looking to improve his skills in writing maintainable
        and modern react code. His website is a mishmash of unfinished ideas, but it's a
        great way to see what they're up to.
      </Text>
      <Flex gap={2}>
        <Anchor decoration='none' href='https://github.com/ViewableGravy'>
          <Flex align-center>
            <Icons.Github height={16} /> Github
          </Flex>
        </Anchor>
        <Anchor decoration='none' href='https://twitter.com/ViewableGravy'>
          <Flex align-center>
            <Icons.Twitter height={16} /> Twitter
          </Flex>
        </Anchor>
        <Anchor decoration='none' href='https://www.linkedin.com/in/lleyton-morris-20540b192/'>
          <Flex align-center>
            <Icons.LinkedIn height={16} /> LinkedIn
          </Flex>
        </Anchor>
      </Flex>
      <Padding margin top={20}>
        <Flex direction-col gap={2}>
          <Border all radius={3} color='color_tertiary'>
            <Padding all={12}>
              <Text lead-1 remove-margin customColor="tertiary" bold>
                Typescript
              </Text>
            </Padding>
          </Border>
          <Border all radius={3} color='color_tertiary'>
            <Padding all={12}>
              <Text lead-1 remove-margin customColor="tertiary" bold>
                Tanstack
              </Text>
            </Padding>
          </Border>
          <Border all radius={3} color='color_tertiary'>
            <Padding all={12}>
              <Text lead-1 remove-margin customColor="tertiary" bold>
                Self Hoster
              </Text>
            </Padding>
          </Border>
          <Border all radius={3} color='color_tertiary'>
            <Padding all={12}>
              <Text lead-1 remove-margin customColor="tertiary" bold>
                Coming Soon
              </Text>
            </Padding>
          </Border>
        </Flex>
      </Padding>
    </div>
  )
}

const DashboardContent = () => {
  return (
    <div className='DashboardContent'>
      <h1>Dashboard</h1>
    </div>
  )
}

export const Dashboard2 = () => {
  return (
    <div className='Dashboard2'>
      <Grid columns={["auto", "1fr"]} gap={4}>
        <ProfileTile />
        <DashboardContent />
      </Grid>
    </div>
  )
}