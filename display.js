const decode = text => {
    text = text.replace(/\+/g, " ");
    text = text.replace(/%[a-fA-F0-9]{2}/g, 
         text => String.fromCharCode( "0x" + text.substr(1,2))
    );
    return text;
}
    
const display_data = () => {
    const url_parts = window.location.toString().split("?");
    if ( url_parts.length != 2 ) return;
    
    const fields = url_parts[1].split("&");
    
    if ( fields.length == 0 ) {
        document.write("<p>No data was submitted.</p>");
    } else {
        document.write("<table>");
        let field_parts;
        for ( var i in fields ) {
            field_parts = fields[i].split("=");
            field_parts[0] = decode( field_parts[0] );
            field_parts[1] = decode( field_parts[1] );
            document.write("<tr>");
            document.write("<th>" + field_parts[0] + "</th>");
            document.write("<td>" + field_parts[1] + "</td>");
            document.write("</tr>");
        }
        document.write("</table>");
    }
}