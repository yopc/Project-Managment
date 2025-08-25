export function countTotalItems(message) {
  let total = 0;
  
  // count text if exists
  if (message.text && message.text.trim() !== "") {
    total += 1;
  }

  // count files
  if (message.files && Array.isArray(message.files)) {
    total += message.files.length;
  }

  return total;
}

