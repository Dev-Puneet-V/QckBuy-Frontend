const downloadFile = async (url: string, fileName: string) => {
  console.log(url, fileName)
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

export default downloadFile;