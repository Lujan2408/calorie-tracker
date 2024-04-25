import { Activity } from "../types/types"

export type ActivityAcions = 
{ type: 'save-activity', payload: { newActivity : Activity } } |
{ type: 'set-activeId', payload: { id : Activity['id'] } } | 
{ type: 'delete-activity', payload: { id : Activity['id'] } }  

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivites = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities: localStorageActivites(),
    activeId: ''
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityAcions
    ) => {

    // Action para save-activity
    if (action.type === 'save-activity') {
        
        let updatedActivities : Activity[] = []
       
        if(state.activeId) {
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? 
                action.payload.newActivity : 
                    activity )
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    // Action para set-activeId
    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    // Action para delete-activity
    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id != action.payload.id )  
        }
    }

    return state
}