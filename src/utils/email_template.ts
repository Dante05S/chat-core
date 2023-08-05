export const getContentHtml = (name: string, code: number): string => {
  return `
    <table style="width:100%;margin:auto">
      <tbody style="font-family:'Segoe UI','Segoe UI Web (West European)','Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',sans-serif">
        <tr>
          <td style="text-align:center">
            <img src="https://i.ibb.co/vBbDhXz/mobile-app.jpg" alt="mobile-app" border="0" width="auto" height="180">
          </td>
        </tr>
        <tr>
          <td style="text-align:center;padding-top:5px">
            <p style="font-weight:bold;margin:0;font-size:20px">Hola, <span style="color:#5852D6">${name}</span></p>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;padding-top:15px">
            <p style="font-weight:500;margin:0;font-size:15px">Aqui esta tu codigo de confirmación💜</p>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;padding-top:15px">
            <p style="font-size:30px;font-weight:bold;margin:0">${code}</p>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;padding-top:15px">
            <p style="font-weight:500;margin:0;font-size:15px">Ingrese el codigo de confirmación en Chat.ABS() para completar el proceso de confirmación del email</p>
          </td>
        </tr>
      </tbody>
    </table>
  `
}
