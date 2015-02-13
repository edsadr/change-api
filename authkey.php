<?php
  $api_key = '412efdb66b18429f8bb6a7cfa6fb1739b3ce626c1c5bd598331fdc2c158116c2';
  $secret_token = '3e603bdc29d0a315f0a73faa762ac6965178b93b22bfb643f5e77af01614104b';
  $petition_id = 2780461;

  $host = 'https://api.change.org';
  $endpoint = "/v1/petitions/$petition_id/auth_keys";
  $request_url = $host . $endpoint;

  $ctime =gmdate("Y-m-d\TH:i:s\Z");
  //$ctime ='2015-02-10T06:05:15Z';
  $params = array();
  $params['api_key'] = $api_key;
  $params['source_description'] = 'MedellinJS'; // Something human readable.
  $params['source'] = 'http://medellinjs.org/comparte'; // Eventually included in every signature submitted with the auth key obtained with this request.
  $params['requester_email'] = 'edsadr@gmail.com'; // The email associated with your API key and Change.org account.
  $params['timestamp'] = $ctime; // ISO-8601-formtted timestamp at UTC
  $params['endpoint'] = $endpoint;

  // Build request signature and add it as a parameter
  $query_string_with_secret_and_auth_key = http_build_query($params) . $secret_token;
  echo $ctime."\n";;
  $params['rsig'] = hash('sha256', $query_string_with_secret_and_auth_key);
  echo $query_string_with_secret_and_auth_key."\n";
  print_r($params);

  // Final request body
  $query = http_build_query($params);
  print_r($query);

  // Make the request
  $curl_session = curl_init();
  curl_setopt_array($curl_session, array(
    CURLOPT_POST => 1,
    CURLOPT_URL => $request_url,
    CURLOPT_POSTFIELDS => $query,
    CURLOPT_RETURNTRANSFER => true
  ));

  $result = curl_exec($curl_session);
  $result = curl_exec($curl_session);
  $json_response = json_decode($result, true);
  print_r($json_response);

?>