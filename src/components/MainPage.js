import React, {useEffect, useState} from 'react'
import { Grid} from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import heart from '../svg/heartsvg.svg'
import idea from '../svg/idea.svg'
import laughing from '../svg/laughing.svg'


 function MainPage() {

    const [postInfo, setPostInfo] = useState()
    const [popularityVote, setPopularityVote] = useState()
    const [funnyVote, setFunnyVote] = useState()
    const [smartVote, setSmartVote] = useState()



    useEffect(() => {
        fetch(" https://api.yup.io/posts/post/12294")
        .then(r => r.json())
        .then((profileData) => {
            setPostInfo(profileData)
            if((profileData["catVotes"]["popularity"]["up"]) > 0){
                setPopularityVote(profileData["catVotes"]["popularity"]["up"])
            }else{ 
                setPopularityVote(-Math.abs(profileData["catVotes"]["popularity"]["down"]))
            }
            if((profileData["catVotes"]["funny"]["up"]) > 0){
                setFunnyVote(profileData["catVotes"]["funny"]["up"])
            }else{ 
                setFunnyVote(-Math.abs(profileData["catVotes"]["funny"]["down"]))
            }
            if((profileData["catVotes"]["intelligence"]["up"]) > 0){
                setSmartVote(profileData["catVotes"]["intelligence"]["up"])
            }else{ 
                setSmartVote(-Math.abs(profileData["catVotes"]["intelligence"]["down"]))
            }

        })
        
    }, [])
  

    function handleUpPopular(){
        setPopularityVote(popularityVote + 1)
    }
    function handleUpFunny(){
        setFunnyVote(funnyVote + 1)
    }
    function handleUpSmart(){
        setSmartVote(smartVote + 1)
    }
    function handleDownPopular(){
        setPopularityVote(popularityVote - 1)
    }
    function handleDownFunny(){
        setFunnyVote(funnyVote - 1)
    }
    function handleDownSmart(){
        setSmartVote(smartVote - 1)
         
    }
    
      const levelColors = {
        first: '#00E4FF',
        second: '#00FFA6',
        third: '#3EFF00',
        fourth: '#FFFB00',
        fifth: '#FFAE00',
        sixth: '#FF6100'
      }


    return postInfo && postInfo["weights"] ? (
            <div className="main-page-container">
            <h1>YUP MAINPAGE</h1>
            <img src={postInfo.previewData.img} height="500px" width="500px"  />
            <Grid container spacing={3}>
             
            <Grid item xs={4}>
            <div className="fave-icon" style={{backgroundColor: levelColors[postInfo["sextiles"]["popularity"]]}} >
            <Tooltip title="Favorite">
            <img src={heart} height="20px" width="20px"   />
            </Tooltip>
            <div>{postInfo["weights"]["popularity"]}</div>
             <>
             <div className="grid-fave">
             <KeyboardArrowUpIcon onClick={handleUpPopular} /> 
            <div>{popularityVote}</div>
            < KeyboardArrowDownIcon onClick={handleDownPopular}  />
            </div>
             </> 
             </div>
            </Grid>


            <Grid item xs={4}>
            <div className="fave-icon" style={{backgroundColor: levelColors[postInfo["sextiles"]["intelligence"]]}}>
            <Tooltip title="Smart">
            <img src={idea} height="20px" width="20px" />
            </Tooltip>
            <div>{postInfo["weights"]["intelligence"]}</div>
            <div className="grid-fave">
            <KeyboardArrowUpIcon onClick={handleUpSmart} />
            <div>{smartVote}</div>
            < KeyboardArrowDownIcon onClick={handleDownSmart} />
            </div>
            </div>
            </Grid>


            <Grid item xs={4}>
            <div className="fave-icon" style={{backgroundColor: levelColors[postInfo["sextiles"]["funny"]]}}>
            <Tooltip title="Funny">
            <img src={laughing} height="20px" width="20px" />
            </Tooltip>
            <div>{Math.floor(postInfo["weights"]["funny"])}</div>
            <div className="grid-fave">
            <KeyboardArrowUpIcon onClick={handleUpFunny} />
            <div>{funnyVote}</div>
            < KeyboardArrowDownIcon onClick={handleDownFunny}/>
            </div>
            </div>
            </Grid>
            </Grid>
        </div>
    ) : null
}

export default MainPage