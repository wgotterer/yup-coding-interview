import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';

function GridItem(props) {

    function handleUpVote(){
        props.setVoteNumber(props.voteNumber + 1)
    }

    function handleDownVote(){
        props.setVoteNumber(props.voteNumber - 1)
    }
        return (
            <div>
                <div className="fave-icon" >
                    <Tooltip title={props.title}>
                        <img src={props.emoji} height="20px" width="20px" />
                    </Tooltip>
                    <Tooltip title="Post Yup Score">
                        <div className="underline" style={{textDecorationColor: props.sextileColor}}>
                            {props.score}
                        </div>
                    </Tooltip>
                    <Tooltip title="Number of Votes">
                        <div>{props.voteNumber}</div>
                    </Tooltip>
                    <div className="grid-fave">
                        <KeyboardArrowUpIcon  className="arrow-up"  onClick={() => handleUpVote()} /> 
                        <div>{props.voteNumber}</div>
                        < KeyboardArrowDownIcon className="arrow-down" onClick={() => handleDownVote()}  />
                    </div>
                </div>
            </div>
        )
}

export default GridItem





