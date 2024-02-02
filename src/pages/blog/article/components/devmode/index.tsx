import { TComponentNames } from "../componentConstructor"

type TOwnDevHandleMessage = React.FC<{
    validator: TComponentNames,
    type: string,
    props: unknown,
    parsed: { error: unknown }
  }>
  
export const OwnDevHandleMessage: TOwnDevHandleMessage = ({ validator, type, props, parsed }) => {
  if (import.meta.env.DEV) {
    try {
      return (
        <div 
          style={{    
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            paddingTop: 1
          }}
        >
          <h1>Component Constructor</h1>
          <p>Type: {type}</p>
          <p>Component: {validator}</p>
          <p>Props: {JSON.stringify(props)}</p>
          <p>Errors: {JSON.stringify(parsed?.error)}</p>
        </div>
      )
    } catch (error) {
      return (
        <div>
          <h1>Crashed while outputting errors</h1>
        </div>
      )
    }
  }

  return null;
}