var token;

/**
 * Called when the client library is loaded to start the auth flow.
 */
function handleClientLoad() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'refresh.php');
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				token = xhr.responseText;
			}
		}
	};
	xhr.send();

	var filePicker = document.getElementById('filePicker');
	filePicker.onchange = uploadFile;
}

/**
 * Start the file upload.
 *
 * @param {Object} evt Arguments from the file selector.
 */
function uploadFile(evt) {
	console.log(evt);
	gapi.client.load('drive', 'v2', function() {
		var file = evt.target.files[0];
		insertFile(file);
	});
}

/**
 * Insert new file.
 *
 * @param {File} fileData File object to read data from.
 * @param {Function} callback Function to call when the request is complete.
 */
function insertFile(fileData, callback) {
	const boundary = '-------314159265358979323846';
	const delimiter = "\r\n--" + boundary + "\r\n";
	const close_delim = "\r\n--" + boundary + "--";

	var reader = new FileReader();
	reader.readAsBinaryString(fileData);
	reader.onload = function(e) {
		var contentType = fileData.type || 'application/octet-stream';
		var metadata = {
			'title' : fileData.name,
			'mimeType' : contentType
		};

		var base64Data = btoa(reader.result);
		var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) + delimiter + 'Content-Type: ' + contentType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data + close_delim;

		var request = gapi.client.request({
			'path' : '/upload/drive/v2/files?access_token=' + token,
			'method' : 'POST',
			'params' : {
				'uploadType' : 'multipart'
			},
			'headers' : {
				'Content-Type' : 'multipart/mixed; boundary="' + boundary + '"'
			},
			'body' : multipartRequestBody
		});
		if (!callback) {
			callback = function(file) {
				console.log(file)
			};
		}
		request.execute(callback);
	}
}