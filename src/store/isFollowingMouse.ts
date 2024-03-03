/***** BASE IMPORTS *****/
import { atom } from "jotai/vanilla";

/***** TYPE DEFINTIONS *****/
export namespace TFollowingMouse {
    export type Base = {
        isFollowing: boolean,
        following: string | null,
    }
}

export const _generateFollowingAtoms = () => {
    const base = atom<TFollowingMouse.Base>({
        isFollowing: false,
        following: null,
    })
    
    /**
     * @description
     * This atom is used to set the following state of the visitor mice. Provide a mouse ID to 
     * follow, or null to unfollow.
     */
    const followerState = atom((get) => get(base), (_, set, following?: string) => {
        if (following) {
            set(base, {
                isFollowing: true,
                following,
            })
        } else {
            set(base, {
                isFollowing: false,
                following: null,
            })
        }
    });

    return { followerState }
}