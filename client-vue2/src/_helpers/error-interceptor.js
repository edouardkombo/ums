export function errorResponse(error, commitMessage, commit, dispatch) {
    if (Object.keys(error).length > 0) {
        if (!Object.keys(error).includes('message')) {
            commit(commitMessage, error[0].message);
            for (let i in error) {
                 dispatch('alert/error', [error[i].message, error[i].propertyPath], { root: true });     
            }          
        } else {
            commit(commitMessage, error || null);
            dispatch('alert/error', error || null, { root: true });          
        }
      
    } else {
      console.log("2",error)
        commit(commitMessage, error || null);
        dispatch('alert/error', error || null, { root: true });
    }
  
}