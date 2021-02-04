import jester
from strutils import multireplace, contains
from json import parseFile, getFields, getStr, getInt
from httpclient import newHttpClient, getContent

proc getsettings() : tuple[port : int, address : string] =

  try:
    var info = parseFile("settings.json")
    var jinfo = info.getFields

    result.port = jinfo["port"].getInt
    result.address = jinfo["bindAddr"].getStr

  except:
    result.port = 5000
    result.address = "0.0.0.0"

proc refineurl(url : string) : string =
  
  if url.contains("http") or url.contains("https"):
    var url = url.multiReplace([("%3A", ":"), ("%2F", "/")])
    result = url.normalizeUri

  else:
    result = "/error/"

var info = getsettings()
settings:
  port = Port(info.port)
  bindAddr = info.address


when isMainModule:

  routes:

    get "/@url":
      var client = newHttpClient()
      var info = client.getContent((@"url").refineurl)
      var header = {"Access-Control-Allow-Origin" : "*"}
      resp Http200, header, info

    error Http404:
      resp "invalid url"