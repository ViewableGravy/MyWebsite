/**
 * @fileoverview
 * This file providers atoms for use within the application.
 */

import { atom } from "jotai/vanilla";

namespace Store {
    export namespace VisitorMice {
        export namespace following {
            export type base = {
                isFollowing: boolean,
                following: string | null,
            }
        }
    }
}

const generateFollowingAtoms = () => {
    const base = atom<Store.VisitorMice.following.base>({
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

export const store = {
    visitorMice: {
        following: generateFollowingAtoms(),
    }
}