
import chapters from './chapters'

function getTitleById(id) {
  for (let chapter of chapters) {
    if (chapter.id === id) {
      return chapter.title;
    }
  }

  return null; 
}
function getSubchapterCountById(id) {
    let count = 0;
  
    for (let chapter of chapters) {
      if (chapter.id === id && chapter.subchapters) {
        count += chapter.subchapters.length;
        break;    
        }
    }
  
    return count;
  }

export  {getTitleById, getSubchapterCountById};