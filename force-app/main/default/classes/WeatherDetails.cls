/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 03-31-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   03-31-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public class WeatherDetails {
    public class Weather {
    @AuraEnabled public String icon {get;set;}
    @AuraEnabled public Decimal code {get;set;}
    @AuraEnabled public String description {get;set;}
    public Weather(JSONParser parser) {
    while (parser.nextToken() != System.JSONToken.END_OBJECT) {
    if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
    String text = parser.getText();
    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
    if (text == 'icon') {
    icon = parser.getText();
    } else if (text == 'code') {
    code = parser.getDecimalValue();
    } else if (text == 'description') {
    description = parser.getText();
    } else {
    System.debug(LoggingLevel.WARN, 'Weather consuming unrecognized property: '+text);
    consumeObject(parser);
    }
    }
    }
    }
    }
    }
    @AuraEnabled public List<Data> data {get;set;}
    @AuraEnabled public Decimal count {get;set;}
    public WeatherDetails(JSONParser parser) {
    while (parser.nextToken() != System.JSONToken.END_OBJECT) {
    if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
    String text = parser.getText();
    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
    if (text == 'data') {
    data = arrayOfData(parser);
    } else if (text == 'count') {
    count = parser.getDecimalValue();
    } else {
    System.debug(LoggingLevel.WARN, 'JSON2Apex consuming unrecognized property: '+text);
    consumeObject(parser);
    }
    }
    }
    }
    }
    public class Data {
    @AuraEnabled public Double rh {get;set;}
    @AuraEnabled public String pod {get;set;}
    @AuraEnabled public Double lon {get;set;}
    @AuraEnabled public Decimal pres {get;set;}
    @AuraEnabled public String timezone {get;set;}
    @AuraEnabled public String ob_time {get;set;}
    @AuraEnabled public String country_code {get;set;}
    @AuraEnabled public Decimal clouds {get;set;}
    @AuraEnabled public Decimal ts {get;set;}
    @AuraEnabled public Decimal solar_rad {get;set;}
    @AuraEnabled public String state_code {get;set;}
    @AuraEnabled public String city_name {get;set;}
    @AuraEnabled public Double wind_spd {get;set;}
    @AuraEnabled public String wind_cdir_full {get;set;}
    @AuraEnabled public String wind_cdir {get;set;}
    @AuraEnabled public Decimal slp {get;set;}
    @AuraEnabled public Decimal vis {get;set;}
    @AuraEnabled public Double h_angle {get;set;}
    @AuraEnabled public String sunset {get;set;}
    @AuraEnabled public Decimal dni {get;set;}
    @AuraEnabled public Double dewpt {get;set;}
    @AuraEnabled public Decimal snow {get;set;}
    @AuraEnabled public Decimal uv {get;set;}
    @AuraEnabled public Decimal precip {get;set;}
    @AuraEnabled public Decimal wind_dir {get;set;}
    @AuraEnabled public String sunrise {get;set;}
    @AuraEnabled public Decimal ghi {get;set;}
    @AuraEnabled public Decimal dhi {get;set;}
    @AuraEnabled public Decimal aqi {get;set;}
    @AuraEnabled public Double lat {get;set;}
    @AuraEnabled public Weather weather {get;set;}
    @AuraEnabled public String dateNTime {get;set;}
    @AuraEnabled public Double temp {get;set;}
    @AuraEnabled public String station {get;set;}
    @AuraEnabled public Double elev_angle {get;set;}
    @AuraEnabled public Double app_temp {get;set;}
    public Data(JSONParser parser) {
    while (parser.nextToken() != System.JSONToken.END_OBJECT) {
    if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
    String text = parser.getText();
    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
    if (text == 'rh') {
    rh = parser.getDoubleValue();
    } else if (text == 'pod') {
    pod = parser.getText();
    } else if (text == 'lon') {
    lon = parser.getDoubleValue();
    } else if (text == 'pres') {
    pres = parser.getDecimalValue();
    } else if (text == 'timezone') {
    timezone = parser.getText();
    } else if (text == 'ob_time') {
    ob_time = parser.getText();
    } else if (text == 'country_code') {
    country_code = parser.getText();
    } else if (text == 'clouds') {
    clouds = parser.getDecimalValue();
    } else if (text == 'ts') {
    ts = parser.getDecimalValue();
    } else if (text == 'solar_rad') {
    solar_rad = parser.getDecimalValue();
    } else if (text == 'state_code') {
    state_code = parser.getText();
    } else if (text == 'city_name') {
    city_name = parser.getText();
    } else if (text == 'wind_spd') {
    wind_spd = parser.getDoubleValue();
    } else if (text == 'wind_cdir_full') {
    wind_cdir_full = parser.getText();
    } else if (text == 'wind_cdir') {
    wind_cdir = parser.getText();
    } else if (text == 'slp') {
    slp = parser.getDecimalValue();
    } else if (text == 'vis') {
    vis = parser.getDecimalValue();
    } else if (text == 'h_angle') {
    h_angle = parser.getDoubleValue();
    } else if (text == 'sunset') {
    sunset = parser.getText();
    } else if (text == 'dni') {
    dni = parser.getDecimalValue();
    } else if (text == 'dewpt') {
    dewpt = parser.getDoubleValue();
    } else if (text == 'snow') {
    snow = parser.getDecimalValue();
    } else if (text == 'uv') {
    uv = parser.getDecimalValue();
    } else if (text == 'precip') {
    precip = parser.getDecimalValue();
    } else if (text == 'wind_dir') {
    wind_dir = parser.getDecimalValue();
    } else if (text == 'sunrise') {
    sunrise = parser.getText();
    } else if (text == 'ghi') {
    ghi = parser.getDecimalValue();
    } else if (text == 'dhi') {
    dhi = parser.getDecimalValue();
    } else if (text == 'aqi') {
    aqi = parser.getDecimalValue();
    } else if (text == 'lat') {
    lat = parser.getDoubleValue();
    } else if (text == 'weather') {
    weather = new Weather(parser);
    } else if (text == 'datetime') {
    dateNTime = parser.getText();
    } else if (text == 'temp') {
    temp = parser.getDoubleValue();
    } else if (text == 'station') {
    station = parser.getText();
    } else if (text == 'elev_angle') {
    elev_angle = parser.getDoubleValue();
    } else if (text == 'app_temp') {
    app_temp = parser.getDoubleValue();
    } else {
    System.debug(LoggingLevel.WARN, 'Data consuming unrecognized property: '+text);
    consumeObject(parser);
    }
    }
    }
    }
    }
    }
    
    public static WeatherDetails parse(String json) {
    System.JSONParser parser = System.JSON.createParser(json);
    return new WeatherDetails(parser);
    }
    public static void consumeObject(System.JSONParser parser) {
    Integer depth = 0;
    do {
    System.JSONToken curr = parser.getCurrentToken();
    if (curr == System.JSONToken.START_OBJECT ||
    curr == System.JSONToken.START_ARRAY) {
    depth++;
    } else if (curr == System.JSONToken.END_OBJECT ||
    curr == System.JSONToken.END_ARRAY) {
    depth--;
    }
    } while (depth > 0 && parser.nextToken() != null);
    }
    
    private static List<Data> arrayOfData(System.JSONParser p) {
    List<Data> res = new List<Data>();
    if (p.getCurrentToken() == null) p.nextToken();
    while (p.nextToken() != System.JSONToken.END_ARRAY) {
    res.add(new Data(p));
    }
    return res;
    }
    }