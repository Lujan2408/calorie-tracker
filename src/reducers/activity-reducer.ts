import { Activity } from "../types/types"

export type ActivityAcions = 
{ type: 'save-activity', payload: { newActivity : Activity } } |
{ type: 'set-activeId', payload: { id : Activity['id'] } }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

export const initialState : ActivityState = {
    activities: [],
    activeId: ''
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityAcions
    ) => {
    if (action.type === 'save-activity') {

        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    return state
}