function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function getWordEndingByCount(count: number) {
  return count !== 1 ? 's' : '';
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}

export { capitalize, getWordEndingByCount, formatDate };
