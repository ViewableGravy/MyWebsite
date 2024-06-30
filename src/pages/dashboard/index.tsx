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

const Achievements = () => {
  return (
    <Padding top={20}>
      <Text.Heading level={3} size-xl>Achievements</Text.Heading>
      <Grid columns={["1fr", "1fr", "1fr"]} gap={5}>

        <Border no-overflow all radius={8}>
          <Shine full-height>
            <Padding all={12}>
              <Text size-sm remove-margin bold lead-md>Typed up</Text>
              <Text remove-margin size-xs>Write a multi-line type</Text>
            </Padding>
          </Shine>
        </Border>

        <Border no-overflow all radius={8}>
          <Shine full-height>
            <Padding all={12}>
              <Text size-sm remove-margin bold lead-md>Not so junior</Text>
              <Text remove-margin size-xs>
                Maintain a professional developer position for 1 year
              </Text>
            </Padding>
          </Shine>
        </Border>
      </Grid>
    </Padding>
  )
}

const DashboardContent = () => {
  return (
    <div className='DashboardContent'>
      <Achievements />
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