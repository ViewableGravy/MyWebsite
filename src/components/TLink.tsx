import { useGlobalState } from "../functionality/globalState";

const TLink = ({ children, to, ...props }: any) => {
  const [, dispatch] = useGlobalState();

  return (
    <a 
      {...props} 
      onClick={() => dispatch({ 
        transition: { 
          state: "start", 
          location: to 
        }
      })}
    >
      {children}
    </a>
  )
}

export default TLink;