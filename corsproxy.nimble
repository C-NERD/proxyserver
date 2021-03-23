# Package

version       = "0.2.0"
author        = "C-NERD"
description   = "A proxy server to help bypass CORS browser restrictions"
license       = "MIT"
srcDir        = "src"
bin           = @["corsproxy"]


# Dependencies

requires "nim >= 1.0.0", "jester >= 0.4.3"

proc moveToBin() =

    ## This code creates the bin directory and moves
    ## the executable file and it's dependencies into
    ## the directory
    mkDir("bin")
    cpDir("public", "bin/public")

    if defined(Linux):
        mvFile "corsproxy", "bin/corsproxy"
    elif defined(Windows):
        mvFile "corsproxy.exe", "bin/corsproxy.exe"

proc moveExe() =

    ## This code moves the compiled executable file to the
    ## projects root directory
    if defined(Linux):
        mvFile "src/corsproxy", "corsproxy"
    elif defined(Windows):
        mvFile "src/corsproxy.exe", "corsproxy.exe"

task make, "compiles the code with openssl support":
    exec "nim c -d:ssl -d:useStdLib --threads:on src/corsproxy.nim"
    moveExe()

task makerelease, "compiles a release version of the code with thread support":
    exec "nim c -d:ssl -d:useStdLib -d:release --threads:on src/corsproxy.nim"
    moveExe()

task standalone, "compiles a standalone version of the code into a bin directory":
    exec "nimble makerelease"

    if dirExists("bin"):
        rmDir("bin")
        moveToBin()
    else:
        moveToBin()