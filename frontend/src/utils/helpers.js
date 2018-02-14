import Moment from 'moment'

export const createObjectId = () => {
  let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}

export const capitalize = word => {
  let capitalizedWord = word
  capitalizedWord = capitalizedWord.charAt().toUpperCase() + capitalizedWord.slice(1)
  return capitalizedWord
}

export const calculateDate = timestamp => {

  const yearsAgo = -(Moment(timestamp).diff(Moment(), 'years'));
  const daysAgo = -(Moment(timestamp).diff(Moment(), 'days'));
  const minutesAgo = -(Moment(timestamp).diff(Moment(), 'minutes'));
  const secondsAgo = -(Moment(timestamp).diff(Moment(), 'seconds'));
  // let secondsAgo = -(Moment(timestamp).diff(Moment(), 'seconds'));

  if(secondsAgo < 60){
    // less than 1 minute
    return `${secondsAgo} seconds ago`
  } else {
    // more than 1 minute
    if(minutesAgo < 60){
      // less than 1 hour
      return `${minutesAgo} minutes ago`
    } else {
      // more than 1 hour
      if(daysAgo <= 365){
        // less than 1 year
        return `${daysAgo} days ago`
      } else {
        if(yearsAgo <= 1){
          // 1 year
          return `${yearsAgo} year`
        } else if(yearsAgo > 1){
          // more than 1 year
          return `${yearsAgo} years`
        } 
        // else if(yearsAgo < 1){
        //   // less than 1 year
        // }
      }
    }
  } // END: if


  // if(secondsAgo <= 2){
  //   return 'Now'
  // } else if(secondsAgo > 2 && secondsAgo < 60){
  //   return `${secondsAgo} seconds ago`
  // } else if(secondsAgo >= 60){
  //   return `${minutesAgo} minute ago`
  // } else if(secondsAgo > 60 && secondsAgo < 3600){
  //   return `${minutesAgo} minutes ago`
  // } else if(secondsAgo = 3600){
  //   return `${secondsAgo} hour ago`
  // } else if(secondsAgo > 3600 && secondsAgo < 86400){
  //   return `${secondsAgo} hours ago`
  // } else if(secondsAgo >= 86400 && secondsAgo < 172800){
  //   return `${secondsAgo} day ago`
  // } else if(secondsAgo >= 172800 && secondsAgo < 31536000){
  //   return `${secondsAgo} days ago`
  // } else if(secondsAgo >= 31536000 && secondsAgo < 63072000){
  //   return `${secondsAgo} year ago`
  // } else if (secondsAgo >= 63072000){
  //   return `${secondsAgo} years ago`
  // }

}