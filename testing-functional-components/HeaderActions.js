import React, { Fragment, useState } from 'react'
import { Link } from 'found'
import styled from 'styled-components'
import { graphql, createFragmentContainer } from 'react-relay'
import useHotkeys from 'react-use-hotkeys'

import useModal from '@/hooks/useModal'
import withMediaSize from '@/hoc/withMediaSize'
import CreateTicketForm from '@/components/tickets/CreateTicketForm'
import ShareFeedbackForm from '@/components/tickets/ShareFeedbackForm'
import ThanksForFeedback from '@/components/tickets/ThanksForFeedback'
import Icon from '@/components/Icon'
import Box from '@/styles/Box'
import Flex from '@/styles/Flex'

const IconLink = styled(Box)``
IconLink.defaultProps = {
  as: 'li',
  px: 3,
  color: 'grey.2',
  hoverStyle: 'textColor'
}

function HeaderActions ({ organization, viewer }) {
  const [Modal, setModal] = useModal()
  const [modalContent, setModalContent] = useState('')
  const flag = viewer.featureFlags.find(flag => flag.key === 'createTicket')
  const flagEnabled = flag && flag.enabled
  useHotkeys('t', e => {
    e.preventDefault() // prevent from changing focused input value
    if (!flagEnabled) return
    setModal(true)
    setModalContent('createTicket')
  }, ['tickets'])

  return (
    <Fragment>
      <Modal>
        {modalContent === 'createTicket' && flagEnabled && (
          <CreateTicketForm organization={organization} />
        )}

        {modalContent === 'shareFeedback' && (
          <ShareFeedbackForm afterSubmit={() => setModalContent('thanksForFeedback')} />
        )}

        {modalContent === 'thanksForFeedback' && (
          <ThanksForFeedback handleCTA={() => setModal(false)} />
        )}
      </Modal>

      <Flex.ul pt={[2, 2, 0]}>
        {flagEnabled && (
          <IconLink onClick={() => {
            setModal(true)
            setModalContent('createTicket')
          }}>
            <Icon name='plus' />
          </IconLink>
        )}

        <IconLink onClick={() => {
          setModal(true)
          setModalContent('shareFeedback')
        }}>
          <Icon name='chat' />
        </IconLink>

        <IconLink>
          <Link to='/settings/account'>
            <Icon name='settings' />
          </Link>
        </IconLink>
      </Flex.ul>
    </Fragment>
  )
}

export default createFragmentContainer(
  withMediaSize(HeaderActions),
  graphql`
    fragment HeaderActions_viewer on User {
      featureFlags {
        key
        enabled
      }
    }
    fragment HeaderActions_organization on Organization {
      ...CreateTicketForm_organization
    }
  `
)
