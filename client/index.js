const capture = () => {
  html2canvas(document.body).then(async canvas => {
    const blob = canvas.toDataURL('image/png');
    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ blob })
    });
  })
}

capture()
