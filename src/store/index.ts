/**
 * @fileoverview
 * This file providers atoms for use within the application.
 */
import { _generateServiceStatusAtoms } from "./routedSockets/serviceStatus";
import { _generateFollowingAtoms } from "./isFollowingMouse";
import { _generateSocketsAtoms } from "./routedSockets";

export const store = {
    visitorMice: {
        following: _generateFollowingAtoms(),
    },
    sockets: {
        ..._generateSocketsAtoms()
    }
}