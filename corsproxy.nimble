# Package

version       = "0.1.0"
author        = "cnerd"
description   = "a proxy server to help bypass CORS browser restrictions"
license       = "MIT"
srcDir        = "src"
bin           = @["corsproxy"]


# Dependencies

requires "nim >= 1.0.0", "jester >= 0.4.3"

task make, "compiles the code with openssl support":
    exec "nim c -d:ssl -d:release -d:useStdLib src/corsproxy.nim"
    mvFile "src/corsproxy", "corsproxy"

task wmake, "compiles the code for windows with openssl support":
    exec "nim c -d:ssl -d:release -d:useStdLib -d:mingw src/corsproxy.nim"
    mvFile "src/corsproxy.exe", "corsproxy.exe"

task release, "compiles the code for production the executable will be in the bin folder":
    exec "nimble make"
    mkDir "bin"
    try:
        cpFile "settings.json", "bin/settings.json"
        mvFile "corsproxy", "bin/corsproxy"

    except:
        mvFile "corsproxy.exe", "bin/corsproxy.exe"
