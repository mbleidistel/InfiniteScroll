<?PHP

    function getFiles($folder)
    {
        global $files;
        $handle = opendir($folder);

        # Making an array containing the files in the current directory:
        while ($file = readdir($handle))
        {
            if ( $file[0] != "." && $file != "GetDirectory.php" )
            {
                if ( $folder != "." )
                {
                    $files[] = $folder."/".$file;
                }
                else
                {
                    $files[] = $file;
                }
                # In case this is a directory, recursive into it
                getFiles( end($files) );
            }
        }
        closedir($handle);
    }

    # Get the current folder contents to get things started
    getFiles(".");

    $array = array();
    foreach ($files as $file)
    {
        array_push($array, $file);
    }

    echo json_encode($array);
?>
