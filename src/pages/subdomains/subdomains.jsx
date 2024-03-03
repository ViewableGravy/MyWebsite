import React, { useRef } from 'react';
import { domains } from './subdomain-list';
import { Menu } from '../blog/menu/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faServer, faHome, faGlobe, faQuestionCircle, faCircleCheck, faCross } from '@fortawesome/free-solid-svg-icons'
import { createUseStyles } from 'react-jss';
import Text from 'components/text';
import './subdomains.scss'
import { useStatus } from 'hooks/useStatus';
import { Header } from 'components/navbar';

const styles = {
  menu: {
    maxWidth: 'min(80vw, 1800px)',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '5rem',
  },
}

const useStyles = createUseStyles(styles);

export const Subdomains = () => {
  const classes = useStyles();
  const {
    data,
    isLoading
  } = useStatus();

  const domainsWithStatus = domains.map((domain) => {
    const relative = isLoading ? null : data.find(({ monitor_name }) => {
      return monitor_name.toLowerCase() === domain.name.toLowerCase() ||
      monitor_name.toLowerCase() === domain.domain.toLowerCase()
    });

    return {
      ...domain,
      status: relative ? relative.status : "unknown"
    }
  })

  const headerProps = Header.useHeaderProps();
  
  return (
    <div>
      <Header {...headerProps} />
      <div className='subdomains_wrapper'>
        <ul className='outer_list'> 
          {domainsWithStatus.map((subdomain, index) => <Subdomain {...subdomain} key={index} index={index}/>)}
        </ul>
      </div>
    </div>
  )
};

const Subdomain = ({
  name, 
  domain, 
  path, 
  color, 
  information, 
  status, 
  index: SubdomainIndex
}) => {
  const style = { 
    "--clr": color, 
    opacity: information?.disabled ? '50%' : "100%"
  };

  const informationKeys = Object.keys(information);

  return (
    <li style={style} >
      <a href={`https://${domain}${path}`} data-text={name}>{name}</a>
      <sub>{domain}</sub>
      {informationKeys.map((key, iconIndex) => (
        <SubdomainIcon 
          value={information[key]}
          key={iconIndex}
          subindex={SubdomainIndex}
          iconIndex={iconIndex + 1}
          type={key}
        />
      ))}
      <SubdomainIcon
        value={status}
        subindex={SubdomainIndex}
        iconIndex={informationKeys.length + 1}
        type={"status"}
      />
    </li>
    )
}

const SubdomainIcon = ({type, subindex, iconIndex, value}) => {
  if (type === "locked" && value) {
    return (
      <IconWithHover icon={faLock} id={`lock-${subindex}`} index={iconIndex}>
        <h2>MFA Enabled</h2>
        <p>This domain is protected by 2FA and is not publicly accessible</p>
      </IconWithHover>
    )
  }

  if (type === "server") {
    return (
      <IconWithHover icon={getServerIcon(value)} id={`server-${subindex}`} index={iconIndex}>
        <h2>{ mapServerToTitle(value) }</h2>
        <p>{ mapServerToDescription(value) }</p>
      </IconWithHover>
    )
  }

  if (type === "shortDescription") {
    return (
      <IconWithHover icon={faQuestionCircle} id={`description-${subindex}`} index={iconIndex}>
        <h2>About</h2>
        <p>{ value }</p>
      </IconWithHover>
    )
  }

  if (type === "status") {
      const getIcon = (status) => {
        switch(status) {
          case "up":
            return faCircleCheck;
          case "down":
            return faCross;
          default:
            return faQuestionCircle;
        }
      }

      return (
        <IconWithHover icon={getIcon(value)} id={`status-${subindex}`} index={iconIndex}>
          <h2>Status</h2>
          <p>This service is currently <Text white bold size-xl><span>{value}</span></Text></p>
        </IconWithHover>
      )
  }
  
  return null;
};

/**
 * @param {Object} props
 * @param {any} props.icon - icon font awesome icon
 * @param {string} props.id - id of the containing element to provide a unique class for the hover information
 * @param {number} props.index - index index of the icon to provide a unique class for the hover information as well as increment right position
 * @param {React.ReactNode} props.children - children children of the hover information
 */
const IconWithHover = ({ children, icon, id, index }) => {
  const hoverInformationRef = useRef(null);

  const handleClick = () => {
    const display = hoverInformationRef.current.style.display;
    
    if (display === 'block') {
      hoverInformationRef.current.style.display = 'none';
    } else {
      hoverInformationRef.current.style.display = 'block';
    }
  }

  const handleMouseEnter = () => {
    hoverInformationRef.current.style.display = 'block';
  }

  const handleMouseLeave = () => {
    hoverInformationRef.current.style.display = 'none';
  }

  const fontAwesomeProps = {
    icon,
    size: 'lg',
    color: "--clr",
    className: "padlock_icon",
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }

  return (
    <div className={"padlock_icon_container"} style={{ right: `${index > 1 ? (28 * index) - 20 : 10}px`, width: '25px' }}>
      <FontAwesomeIcon {...fontAwesomeProps} />
      <div className={`padlock_hover_information ${id}-${index}`} ref={hoverInformationRef}>
        {children}
      </div>
    </div>
  )
}

function getServerIcon(server) {
  switch(server) {
    case 'home':
      return faHome;
    case 'vps':
      return faServer;
    case 'other':
      return faGlobe;
    default:
      return faGlobe;
  }
}

function mapServerToTitle(server) {
  switch(server) {
    case 'home':
      return 'Home Server';
    case 'vps':
      return 'Cloud VPS';
    case 'other':
      return 'Other Server';
    default:
      return 'Other Server';
  }
}

function mapServerToDescription(server) {
  if (server === "home") {
    return "This service is hosted on a self-hosted machine, utilizing a reverse proxy to access my local network";
  } else if (server === "vps") {
    return "This service is hosted on a VPS, this is currently located at NextDC in Sydney";
  } else if (server === "other") {
    return "This service is hosted on a shared hosting or cloud hosting service, the location has not been specified";
  }
}

export default Subdomains;

