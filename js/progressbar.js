function updateProgress(current, total) {
  const percent = (current / total) * 100;
  document.getElementById("bar").style.width = percent + "%";
}