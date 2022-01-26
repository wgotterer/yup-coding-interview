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
            
                setPopularityVote(profileData["catVotes"]["popularity"]["up"] - profileData["catVotes"]["popularity"]["down"] )
                setFunnyVote(profileData["catVotes"]["funny"]["up"] - profileData["catVotes"]["funny"]["down"])
                setSmartVote(profileData["catVotes"]["intelligence"]["up"] - profileData["catVotes"]["intelligence"]["down"])

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
            <div className="fave-icon" >
            <Tooltip title="Favorite">
            <img src={heart} height="20px" width="20px"   />
            </Tooltip>
            <Tooltip title="Post Yup Score">
            <div className="underline" style={{textDecorationColor: levelColors[postInfo["sextiles"]["popularity"]]}}>{postInfo["weights"]["popularity"]}</div>
            </Tooltip>
            <Tooltip title="Number of Votes">
            <div>{popularityVote}</div>
            </Tooltip>
             <div className="grid-fave">
            <KeyboardArrowUpIcon  className="arrow-up"  onClick={handleUpPopular} /> 
            <div>{popularityVote}</div>
            < KeyboardArrowDownIcon className="arrow-down" onClick={handleDownPopular}  />
            </div>
             </div>
            </Grid>


            <Grid item xs={4}>
            <div className="fave-icon" >
            <Tooltip title="Smart">
            <img src={idea} height="20px" width="20px" />
            </Tooltip>
            <Tooltip title="Post Yup Score">
            <div className="underline" style={{textDecorationColor: levelColors[postInfo["sextiles"]["intelligence"]]}} >{postInfo["weights"]["intelligence"]}</div>
            </Tooltip>
            <Tooltip title="Number of Votes">
            <div>{smartVote}</div>
            </Tooltip>
            <div className="grid-fave">
            <KeyboardArrowUpIcon className="arrow-up" onClick={handleUpSmart} />
            <div>{smartVote}</div>
            < KeyboardArrowDownIcon className="arrow-down" onClick={handleDownSmart} />
            </div>
            </div>
            </Grid>


            <Grid item xs={4}>
            <div className="fave-icon" >
            <Tooltip title="Funny">
            <img src={laughing} height="20px" width="20px" />
            </Tooltip>
            <Tooltip title="Post Yup Score">
            <div className="underline" style={{textDecorationColor: levelColors[postInfo["sextiles"]["funny"]]}}>{Math.floor(postInfo["weights"]["funny"])} </div>
            </Tooltip>
            <Tooltip title="Number of Votes">
            <div>{funnyVote}</div>
            </Tooltip>
            <div className="grid-fave">
            <KeyboardArrowUpIcon className="arrow-up" onClick={handleUpFunny} />
            <div>{funnyVote}</div>
            < KeyboardArrowDownIcon className="arrow-down" onClick={handleDownFunny}/>
            </div>
            </div>
            </Grid>
            </Grid>
        </div>
    ) : null
}

export default MainPage