import jester
from strutils import multireplace, contains
from json import parseFile, getFields, getStr, getInt
from httpclient import newHttpClient, getContent

proc getsettings() : tuple[port : int, address : string] =

  try:
    var info = parseFile("public/settings.json")
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

    get "/proxy/@url":
      ## This block serves as a proxy to by-pass CORS restrictions
      let client = newHttpClient()
      let info = client.getContent((@"url").refineurl)
      let header = {"Access-Control-Allow-Origin" : "*"}
      resp Http200, header, info

    get "/file/@url":
      ## This block serves files on the local machine while bypassing
      ## CORS restrictions.
      ## I mostly use this one for testing frontend code
      let info = readFile((@"url").refineurl)
      let header = {"Access-Control-Allow-Origin" : "*"}
      resp Http200, header, info

    error Http404:
      resp "invalid url"