import BlogImage from 'assets/images/home/blog_test_2.webp';
import ContactImage from '../../assets/images/home/contact_me.webp';
import SubdomainsImage from '../../assets/images/home/subdomains.webp';
import { Link } from '@tanstack/react-router';

import './_Dashboard.scss';
import { Grid } from '../../components/utility/grid';

import Text from '../../components/utility/text';
import { Padding } from '../../components/utility/padding';
import { ProfileTile } from './profile-tile';

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