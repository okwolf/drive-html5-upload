<?php
namespace com\google\api\config;
class GoogleAPIConfig {
	private static $clientId = 'YOUR_CLIENT_ID';
	private static $clientSecret = 'YOUR_CLIENT_SECRET';
	private static $refreshToken = 'YOUR_REFRESH_TOKEN';
	public static $tokenURL = 'https://accounts.google.com/o/oauth2/token';
	public static $refreshParameters = null;
	public static function GoogleAPIConfigInit() {
		self::$refreshParameters = array();
		self::$refreshParameters['client_id'] = self::$clientId;
		self::$refreshParameters['client_secret'] = self::$clientSecret;
		self::$refreshParameters['refresh_token'] = self::$refreshToken;
		self::$refreshParameters['grant_type'] = 'refresh_token';
	}

} GoogleAPIConfig::GoogleAPIConfigInit();
