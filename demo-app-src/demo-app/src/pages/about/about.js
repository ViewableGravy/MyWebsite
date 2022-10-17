import { Timeline } from 'react-native-just-timeline'

export function About() {
    return <Timeline data={
        [
            {
                title: {
                    content: 'Event title one'
                },
                description: {
                    content: 'Event description one'
                }
            }
        ]
    } />;
}